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
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Galeri</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">{gallery.length} fotoğraf yüklendi</p>
        </div>
        <label className={`flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-semibold transition-all cursor-pointer shadow-md shadow-blue-500/20 ${uploading ? 'opacity-50 pointer-events-none' : ''}`}>
          {uploading ? <Loader2 size={18} className="animate-spin" /> : <Upload size={18} />}
          {uploading ? 'Yükleniyor...' : 'Fotoğraf Yükle'}
          <input ref={fileRef} type="file" multiple accept="image/*" onChange={handleUpload} className="hidden" />
        </label>
      </div>

      {/* Drop Zone */}
      <div
        className={`bg-white dark:bg-gray-900 border-2 border-dashed rounded-2xl p-10 text-center transition-all duration-200 ${dragOver ? 'border-blue-400 bg-blue-50 dark:bg-blue-950/20' : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'}`}
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
      >
        <div className="w-14 h-14 bg-gray-100 dark:bg-gray-800 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Plus size={24} className="text-gray-400" />
        </div>
        <p className="text-base font-medium text-gray-700 dark:text-gray-300">Fotoğrafları buraya sürükleyin</p>
        <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">veya yukarıdaki butonu kullanın</p>
      </div>

      {/* Gallery Grid */}
      {gallery.length === 0 ? (
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-16 text-center">
          <Image size={40} className="text-gray-200 dark:text-gray-700 mx-auto mb-4" />
          <p className="text-gray-500 dark:text-gray-400 font-medium">Henüz fotoğraf eklenmemiş</p>
          <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">Yukarıdaki butonu kullanarak veya sürükleyerek fotoğraf ekleyin</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {gallery.map(item => {
            const imgSrc = resolveImageUrl(item.url);
            const isDeleting = deletingId === item.id;
            return (
              <div key={item.id} className={`group relative bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden aspect-square hover:shadow-lg transition-all duration-200 ${isDeleting ? 'opacity-30 scale-95' : ''}`}>
                {imgSrc ? (
                  <img src={imgSrc} alt="Galeri" className="w-full h-full object-cover" loading="lazy" />
                ) : (
                  <div className="w-full h-full bg-gray-50 dark:bg-gray-800 flex items-center justify-center">
                    <Image size={24} className="text-gray-300 dark:text-gray-600" />
                  </div>
                )}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-200 flex items-center justify-center">
                  <button
                    onClick={() => handleDelete(item.id)}
                    disabled={isDeleting}
                    className="opacity-0 group-hover:opacity-100 px-4 py-2 bg-red-500 hover:bg-red-600 rounded-xl text-white text-sm font-medium transition-all duration-200 flex items-center gap-2 cursor-pointer shadow-lg"
                  >
                    <Trash2 size={14} /> Sil
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
