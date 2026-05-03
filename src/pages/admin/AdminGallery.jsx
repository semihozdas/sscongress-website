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
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">Galeri</h1>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-0.5">{gallery.length} fotoğraf</p>
        </div>
        <label className={`flex items-center gap-2 px-5 py-2.5 bg-blue-500 hover:bg-blue-600 text-white rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer shadow-lg shadow-blue-500/20 ${uploading ? 'opacity-50 pointer-events-none' : ''}`}>
          {uploading ? <Loader2 size={16} className="animate-spin" /> : <Upload size={16} />}
          {uploading ? 'Yükleniyor...' : 'Fotoğraf Yükle'}
          <input ref={fileRef} type="file" multiple accept="image/*" onChange={handleUpload} className="hidden" />
        </label>
      </div>

      <div
        className={`border-2 border-dashed rounded-xl p-8 text-center transition-all duration-200 ${dragOver ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' : 'border-gray-300 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-600'}`}
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
      >
        <div className="w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-xl flex items-center justify-center mx-auto mb-3">
          <Plus size={20} className="text-gray-400 dark:text-gray-500" />
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400">Fotoğrafları buraya sürükleyin</p>
        <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">veya yukarıdaki butonu kullanın</p>
      </div>

      {gallery.length === 0 ? (
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow-sm p-16 text-center">
          <Image size={32} className="text-gray-300 dark:text-gray-700 mx-auto mb-3" />
          <p className="text-gray-500 dark:text-gray-400">Henüz fotoğraf eklenmemiş</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
          {gallery.map(item => {
            const imgSrc = resolveImageUrl(item.url);
            const isDeleting = deletingId === item.id;
            return (
              <div key={item.id} className={`group relative bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden aspect-square hover:border-gray-300 dark:hover:border-gray-700 transition-all duration-200 shadow-sm ${isDeleting ? 'opacity-30 scale-95' : ''}`}>
                {imgSrc ? (
                  <img src={imgSrc} alt="Galeri" className="w-full h-full object-cover" loading="lazy" />
                ) : (
                  <div className="w-full h-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                    <Image size={20} className="text-gray-300 dark:text-gray-700" />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-end justify-center pb-3">
                  <button
                    onClick={() => handleDelete(item.id)}
                    disabled={isDeleting}
                    className="px-3 py-1.5 bg-red-500/90 backdrop-blur-sm rounded-lg text-white text-xs font-medium hover:bg-red-600 transition-colors duration-200 flex items-center gap-1.5 cursor-pointer"
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
