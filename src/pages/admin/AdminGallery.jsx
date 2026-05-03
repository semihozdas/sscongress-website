import { useState, useRef } from 'react';
import { useAdmin } from './useAdmin';
import { Upload, Trash2, Image, Loader2, AlertCircle } from 'lucide-react';

const galleryImports = import.meta.glob('../../assets/sss galery/*.webp', { eager: true, query: '?url', import: 'default' });

function resolveImageUrl(url) {
  if (!url) return '';
  if (url.startsWith('http') || url.startsWith('/uploads')) return url;
  const key = Object.keys(galleryImports).find(k => url.includes(k.split('/').pop()));
  if (key) return galleryImports[key];
  const fileName = url.split('/').pop();
  const matchKey = Object.keys(galleryImports).find(k => k.includes(fileName));
  if (matchKey) return galleryImports[matchKey];
  return url;
}

export default function AdminGallery() {
  const { data, loading, uploadGallery, deleteGalleryItem } = useAdmin();
  const [uploading, setUploading] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const fileRef = useRef(null);

  const handleUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;
    setUploading(true);
    try {
      await uploadGallery(files);
    } catch (err) {
      alert('Yükleme hatası: ' + err.message);
    }
    setUploading(false);
    if (fileRef.current) fileRef.current.value = '';
  };

  const handleDelete = async (id) => {
    if (!confirm('Bu fotoğrafı galeriden kaldırmak istediğinize emin misiniz?')) return;
    setDeletingId(id);
    try {
      await deleteGalleryItem(id);
    } catch {
      alert('Silme hatası');
    }
    setDeletingId(null);
  };

  if (loading) return <div className="flex items-center gap-2 text-emerald-400"><Loader2 size={16} className="animate-spin" /> Yükleniyor...</div>;

  const gallery = data?.gallery || [];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2 className="text-xl font-bold text-white">Galeri</h2>
          <p className="text-sm text-gray-500 mt-0.5">{gallery.length} fotoğraf</p>
        </div>
        <label className={`flex items-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-sm font-medium transition-colors duration-200 cursor-pointer ${uploading ? 'opacity-50 pointer-events-none' : ''}`}>
          {uploading ? <Loader2 size={16} className="animate-spin" /> : <Upload size={16} />}
          {uploading ? 'Yükleniyor...' : 'Fotoğraf Yükle'}
          <input ref={fileRef} type="file" multiple accept="image/*" onChange={handleUpload} className="hidden" />
        </label>
      </div>

      {gallery.length === 0 ? (
        <div className="bg-[#0d1210] border border-dashed border-emerald-500/20 rounded-2xl p-16 text-center">
          <div className="w-16 h-16 bg-emerald-500/5 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Image size={28} className="text-gray-600" />
          </div>
          <p className="text-gray-400 font-medium">Henüz galeri fotoğrafı yok</p>
          <p className="text-sm text-gray-600 mt-1">Yukarıdaki butona tıklayarak fotoğraf yükleyin</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
          {gallery.map(item => {
            const imgSrc = resolveImageUrl(item.url);
            const isDeleting = deletingId === item.id;
            return (
              <div key={item.id} className={`group relative bg-[#0d1210] border border-emerald-500/8 rounded-xl overflow-hidden aspect-square transition-all duration-200 hover:border-emerald-500/25 ${isDeleting ? 'opacity-40 scale-95' : ''}`}>
                {imgSrc ? (
                  <img
                    src={imgSrc}
                    alt="Galeri fotoğrafı"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-[#111916]">
                    <AlertCircle size={20} className="text-gray-600" />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-end justify-center pb-3">
                  <button
                    onClick={() => handleDelete(item.id)}
                    disabled={isDeleting}
                    className="px-3 py-1.5 bg-red-500/20 backdrop-blur-sm border border-red-500/30 rounded-lg text-red-400 text-xs font-medium hover:bg-red-500/30 transition-colors duration-200 flex items-center gap-1.5 cursor-pointer"
                  >
                    <Trash2 size={12} />
                    Kaldır
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
