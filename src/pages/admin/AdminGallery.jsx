import { useState, useRef } from 'react';
import { useAdmin } from './useAdmin';
import { Upload, Trash2, Image } from 'lucide-react';

export default function AdminGallery() {
  const { data, loading, uploadGallery, deleteGalleryItem } = useAdmin();
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef(null);

  const handleUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;
    setUploading(true);
    try {
      await uploadGallery(files);
    } catch (err) {
      alert('Yükleme hatası');
    }
    setUploading(false);
    if (fileRef.current) fileRef.current.value = '';
  };

  const handleDelete = async (id) => {
    if (!confirm('Bu fotoğrafı silmek istediğinize emin misiniz?')) return;
    try {
      await deleteGalleryItem(id);
    } catch {
      alert('Silme hatası');
    }
  };

  if (loading) return <div className="text-emerald-400">Yükleniyor...</div>;

  const gallery = data?.gallery || [];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-white">Galeri</h2>
        <label className={`flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-sm font-medium transition cursor-pointer ${uploading ? 'opacity-50 pointer-events-none' : ''}`}>
          <Upload size={16} />
          {uploading ? 'Yükleniyor...' : 'Fotoğraf Yükle'}
          <input ref={fileRef} type="file" multiple accept="image/*" onChange={handleUpload} className="hidden" />
        </label>
      </div>

      {gallery.length === 0 ? (
        <div className="bg-[#111916] border border-emerald-500/10 rounded-xl p-12 text-center">
          <Image size={48} className="text-gray-600 mx-auto mb-3" />
          <p className="text-gray-400">Henüz galeri fotoğrafı eklenmemiş</p>
          <p className="text-sm text-gray-500 mt-1">Yukarıdaki butona tıklayarak fotoğraf yükleyin</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {gallery.map(item => (
            <div key={item.id} className="group relative bg-[#111916] border border-emerald-500/10 rounded-xl overflow-hidden aspect-square">
              <img src={item.url} alt="" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                <button onClick={() => handleDelete(item.id)} className="p-2 bg-red-500/20 border border-red-500/40 rounded-lg text-red-400 hover:bg-red-500/30 transition">
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
