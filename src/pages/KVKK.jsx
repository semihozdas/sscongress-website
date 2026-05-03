import { motion } from 'framer-motion';
import { FileText } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function KVKK() {
  const { t } = useLanguage();

  return (
    <section style={{ backgroundColor: 'var(--c-bg)', padding: '140px 32px 96px' }}>
      <div style={{ maxWidth: 820, margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 32 }}>
            <div style={{ width: 44, height: 44, borderRadius: 12, background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <FileText size={20} style={{ color: '#10b981' }} />
            </div>
            <h1 style={{ fontFamily: 'Outfit', fontWeight: 900, fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)', color: 'var(--c-heading)', margin: 0 }}>
              KVKK Aydınlatma Metni
            </h1>
          </div>

          <p style={{ fontSize: 13, color: 'var(--c-subtle)', marginBottom: 40 }}>
            6698 Sayılı Kişisel Verilerin Korunması Kanunu Kapsamında Aydınlatma Metni
          </p>

          <div className="legal-content" style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
            <LegalSection title="1. Veri Sorumlusu">
              <p>
                6698 sayılı Kişisel Verilerin Korunması Kanunu ("KVKK") uyarınca, kişisel verileriniz veri sorumlusu sıfatıyla <strong>SS Congress Uluslararası Organizasyon ve Danışmanlık</strong> tarafından aşağıda açıklanan kapsamda işlenebilecektir.
              </p>
              <p style={{ marginTop: 8 }}>
                <strong>Adres:</strong> Beştepe Mah. 31. Sok. No:2A Kat:9, Yenimahalle / Ankara<br />
                <strong>E-posta:</strong> info@sscongress.com<br />
                <strong>Telefon:</strong> +90 542 453 36 06
              </p>
            </LegalSection>

            <LegalSection title="2. Kişisel Verilerin İşlenme Amacı">
              <p>Kişisel verileriniz aşağıdaki amaçlarla KVKK'nın 5. ve 6. maddelerinde belirtilen kişisel veri işleme şartları dahilinde işlenmektedir:</p>
              <ul>
                <li>Uluslararası iş forumu ve etkinlik organizasyon hizmetlerinin yürütülmesi</li>
                <li>İş heyeti ve delegasyon programlarının koordinasyonu</li>
                <li>İletişim faaliyetlerinin yürütülmesi</li>
                <li>Sözleşme süreçlerinin yönetimi</li>
                <li>Müşteri ilişkileri yönetimi</li>
                <li>Yasal yükümlülüklerin yerine getirilmesi</li>
                <li>İnsan kaynakları süreçlerinin planlanması</li>
                <li>İş ortaklığı ve koordinasyon süreçlerinin yönetimi</li>
                <li>Şirket faaliyetlerinin ilgili mevzuata uygun yürütülmesi</li>
              </ul>
            </LegalSection>

            <LegalSection title="3. İşlenen Kişisel Veri Kategorileri">
              <ul>
                <li><strong>Kimlik Bilgileri:</strong> Ad, soyad, T.C. kimlik numarası, pasaport bilgileri</li>
                <li><strong>İletişim Bilgileri:</strong> Telefon numarası, e-posta adresi, adres</li>
                <li><strong>Mesleki Bilgiler:</strong> Şirket adı, unvan, sektör bilgisi</li>
                <li><strong>Görsel/İşitsel Veriler:</strong> Etkinlik fotoğrafları, video kayıtları</li>
                <li><strong>Dijital Veriler:</strong> IP adresi, çerez verileri, web sitesi kullanım bilgileri</li>
                <li><strong>Finansal Veriler:</strong> Fatura bilgileri, banka hesap bilgileri (ödeme süreçleri için)</li>
              </ul>
            </LegalSection>

            <LegalSection title="4. Kişisel Verilerin Aktarılması">
              <p>Toplanan kişisel verileriniz, KVKK'nın 8. ve 9. maddelerinde belirtilen kişisel veri işleme şartları çerçevesinde:</p>
              <ul>
                <li>İş ortakları ve hizmet sağlayıcılarına (otel, havayolu, fuar organizatörleri)</li>
                <li>Yasal zorunluluk halinde yetkili kamu kurum ve kuruluşlarına</li>
                <li>Uluslararası etkinlik kapsamında yurt dışındaki organizasyon ortaklarına</li>
                <li>Hukuki danışmanlar ve denetim firmalarına</li>
              </ul>
              <p>aktarılabilmektedir. Yurt dışına veri aktarımı, KVKK'nın 9. maddesinde öngörülen şartlara uygun olarak gerçekleştirilmektedir.</p>
            </LegalSection>

            <LegalSection title="5. Kişisel Veri Toplamanın Yöntemi ve Hukuki Sebebi">
              <p>Kişisel verileriniz;</p>
              <ul>
                <li>Web sitesi iletişim formları</li>
                <li>E-posta ve telefon ile iletişim</li>
                <li>Etkinlik kayıt formları</li>
                <li>Sözleşme süreçleri</li>
                <li>İş başvuru formları</li>
                <li>Çerezler ve otomatik yollar</li>
              </ul>
              <p>vasıtasıyla toplanmaktadır. Hukuki sebepler: açık rıza, sözleşmenin ifası, yasal yükümlülük, meşru menfaat.</p>
            </LegalSection>

            <LegalSection title="6. Veri Sahibinin Hakları">
              <p>KVKK'nın 11. maddesi gereğince, kişisel veri sahibi olarak aşağıdaki haklara sahipsiniz:</p>
              <ul>
                <li>Kişisel verilerinizin işlenip işlenmediğini öğrenme</li>
                <li>Kişisel verileriniz işlenmişse buna ilişkin bilgi talep etme</li>
                <li>Kişisel verilerinizin işlenme amacını ve bunların amacına uygun kullanılıp kullanılmadığını öğrenme</li>
                <li>Yurt içinde veya yurt dışında kişisel verilerin aktarıldığı üçüncü kişileri bilme</li>
                <li>Kişisel verilerin eksik veya yanlış işlenmiş olması hâlinde bunların düzeltilmesini isteme</li>
                <li>KVKK'nın 7. maddesinde öngörülen şartlar çerçevesinde kişisel verilerin silinmesini veya yok edilmesini isteme</li>
                <li>Düzeltme, silme ve yok etme işlemlerinin aktarılan üçüncü kişilere bildirilmesini isteme</li>
                <li>İşlenen verilerin münhasıran otomatik sistemler vasıtasıyla analiz edilmesi suretiyle aleyhinize bir sonucun ortaya çıkmasına itiraz etme</li>
                <li>Kişisel verilerin kanuna aykırı olarak işlenmesi sebebiyle zarara uğramanız hâlinde zararın giderilmesini talep etme</li>
              </ul>
            </LegalSection>

            <LegalSection title="7. Başvuru Yöntemi">
              <p>Yukarıda belirtilen haklarınızı kullanmak için aşağıdaki yöntemlerle başvurabilirsiniz:</p>
              <ul>
                <li><strong>Yazılı Başvuru:</strong> Beştepe Mah. 31. Sok. No:2A Kat:9, Yenimahalle / Ankara</li>
                <li><strong>E-posta:</strong> info@sscongress.com (kayıtlı elektronik posta ile)</li>
              </ul>
              <p style={{ marginTop: 12 }}>
                Başvurunuzda; adınız, soyadınız, T.C. kimlik numaranız, tebligata esas adresiniz, varsa e-posta adresiniz, telefon numaranız ve talep konunuz yer almalıdır. Başvurular en geç 30 gün içinde ücretsiz olarak sonuçlandırılır.
              </p>
            </LegalSection>

            <LegalSection title="8. Veri Güvenliği Tedbirleri">
              <p>SS Congress olarak kişisel verilerinizin güvenliğini sağlamak amacıyla:</p>
              <ul>
                <li>Teknik altyapıda güncel güvenlik yazılımları ve şifreleme teknolojileri kullanılmaktadır</li>
                <li>Veri erişimi yetki matrisi ile sınırlandırılmıştır</li>
                <li>Çalışanlarımız kişisel verilerin korunması konusunda eğitilmektedir</li>
                <li>Düzenli güvenlik denetimleri gerçekleştirilmektedir</li>
                <li>Veri ihlali durumunda KVKK'ya ve ilgili kişilere bildirim prosedürleri uygulanmaktadır</li>
              </ul>
            </LegalSection>

            <LegalSection title="9. Politika Güncellemeleri">
              Bu aydınlatma metni, yasal düzenlemeler ve şirket politikalarındaki değişiklikler doğrultusunda güncellenebilir. Güncellemeler web sitemizde yayımlanarak yürürlüğe girer. Son güncelleme tarihi sayfanın üst kısmında belirtilmektedir.
            </LegalSection>
          </div>
        </motion.div>
      </div>

      <style>{`
        .legal-content ul { padding-left: 20px; margin-top: 8px; }
        .legal-content li { position: relative; padding-left: 16px; margin-bottom: 6px; font-size: 14px; color: var(--c-body); line-height: 1.7; }
        .legal-content li::before { content: ''; position: absolute; left: 0; top: 10px; width: 6px; height: 6px; border-radius: 50%; background: #10b981; }
        .legal-content p { font-size: 14px; color: var(--c-body); line-height: 1.75; }
        .legal-content strong { color: var(--c-heading); }
      `}</style>
    </section>
  );
}

function LegalSection({ title, children }) {
  return (
    <div style={{ borderBottom: '1px solid var(--c-border-xs)', paddingBottom: 28 }}>
      <h2 style={{ fontFamily: 'Outfit', fontWeight: 700, fontSize: 18, color: 'var(--c-heading)', marginBottom: 12 }}>
        {title}
      </h2>
      <div>{children}</div>
    </div>
  );
}
