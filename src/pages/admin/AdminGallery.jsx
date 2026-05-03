import { useState, useRef } from 'react';
import { useAdmin } from './useAdmin';
import { Upload, Trash2, Image, Loader2, Plus } from 'lucide-react';

const galleryImports = import.meta.glob('../../assets/sss galery/*.webp', { eager: true, query: '?url', import: 'default' });

function resolveImageUrl(url) {
  if (!url) return '';
  if (url.startsWith('http') || url.startsWith('/uploads')) return url;
  const fileName = url.split('/').pop();
  const matchKey = Object.keys(galleryImports).find(k => k.includes(fileName));
  if (matchKey) return galleryImports[matchKey];
  return url;
}

export default function AdminGallery() {
  const { data, loading, uploadGallery, deleteGalleryItem } = useAdmin();
  const [uploading, setUploading] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [dragOver, setDragOver] = useState(false);
  const fileRef = useRef(null);

  const handleFiles = async (files) => {
    if (!files.length) return;
    setUploading(true);
    try { await uploadGallery(Array.from(files)); } catch { alert('Yükleme hatası'); }
    setUploading(false);
    if (fileRef.current) fileRef.current.value = '';
  };

  const handleUpload = (e) => handleFiles(e.target.files);

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    handleFiles(e.dataTransfer.files);
  };

  const handleDelete = async (id) => {
    if (!confirm('Bu fotoğrafı kaldırmak istediğinize emin misiniz?')) return;
    setDeletingId(id);
    try { await deleteGalleryItem(id); } catch { alert('Silme hatası'); }
    setDeletingId(null);
  };

  if (loading) return <div className="flex items-center justify-center h-64"><div className="w-8 h-8 border-2 border-blue-500/30 border-t-blue-500 rounded-full animate-spin" /></div>;

  const gallery = data?.gallery || [];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Galeri</h1>
          <p className="text-slate-400 mt-1">{gallery.length} fotoğraf yüklendi</p>
        </div>
        <label className={`flex items-center gap-2 px-5 py-2.5 bg-blue-500 hover:bg-blue-600 text-white rounded-xl text-sm font-semibold transition-all cursor-pointer shadow-lg shadow-blue-500/25 ${uploading ? 'opacity-50 pointer-events-none' : ''}`}>
          {uploading ? <Loader2 size={16} className="animate-spin" /> : <Upload size={16} />}
          {uploading ? 'Yükleniyor...' : 'Fotoğraf Yükle'}
          <input ref={fileRef} type="file" multiple accept="image/*" onChange={handleUpload} className="hidden" />
        </label>
      </div>

      {/* Drop Zone */}
      <div
        className={`bg-slate-900/50 border-2 border-dashed rounded-2xl p-10 text-center transition-all duration-200 ${dragOver ? 'border-blue-500 bg-blue-500/5' : 'border-slate-800 hover:border-slate-700'}`}
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
      >
        <div className="w-14 h-14 bg-slate-800 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Plus size={24} className="text-slate-500" />
        </div>
        <p className="text-sm font-medium text-slate-300">Fotoğrafları buraya sürükleyin</p>
        <p className="text-xs text-slate-600 mt-1">PNG, JPG, WebP desteklenir</p>
      </div>

      {/* Gallery Grid */}
      {gallery.length === 0 ? (
        <div className="bg-slate-900/80 border border-slate-800/60 rounded-2xl p-16 text-center">
          <Image size={36} className="text-slate-700 mx-auto mb-3" />
          <p className="text-slate-500 font-medium">Henüz fotoğraf eklenmemiş</p>
          <p className="text-xs text-slate-600 mt-1">Yukarıdan yükleyin veya sürükleyin</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {gallery.map(item => {
            const imgSrc = resolveImageUrl(item.url);
            const isDeleting = deletingId === item.id;
            return (
              <div key={item.id} className={`group relative bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden aspect-square hover:border-slate-700 hover:shadow-xl hover:shadow-black/20 transition-all duration-200 ${isDeleting ? 'opacity-30 scale-95' : ''}`}>
                {imgSrc ? (
                  <img src={imgSrc} alt="Galeri" className="w-full h-full object-cover" loading="lazy" />
                ) : (
                  <div className="w-full h-full bg-slate-800 flex items-center justify-center">
                    <Image size={20} className="text-slate-700" />
                  </div>
                )}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-200 flex items-center justify-center">
                  <button
                    onClick={() => handleDelete(item.id)}
                    disabled={isDeleting}
                    className="opacity-0 group-hover:opacity-100 px-4 py-2 bg-red-500 hover:bg-red-600 rounded-xl text-white text-xs font-semibold transition-all duration-200 flex items-center gap-1.5 cursor-pointer shadow-lg"
                  >
                    <Trash2 size={12} /> Sil
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
