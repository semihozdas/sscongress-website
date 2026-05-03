import { motion } from 'framer-motion';
import { Shield } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function Privacy() {
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
              <Shield size={20} style={{ color: '#10b981' }} />
            </div>
            <h1 style={{ fontFamily: 'Outfit', fontWeight: 900, fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)', color: 'var(--c-heading)', margin: 0 }}>
              Gizlilik Politikası
            </h1>
          </div>

          <p style={{ fontSize: 13, color: 'var(--c-subtle)', marginBottom: 40 }}>
            Son güncelleme: 1 Ocak 2025
          </p>

          <div className="legal-content" style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
            <LegalSection title="1. Giriş">
              SS Congress Uluslararası Organizasyon ve Danışmanlık ("SS Congress", "Şirket", "biz") olarak kişisel verilerinizin korunmasına büyük önem vermekteyiz. Bu Gizlilik Politikası, web sitemizi (sscongress.com) ziyaret ettiğinizde ve hizmetlerimizden yararlandığınızda kişisel verilerinizin nasıl toplandığını, kullanıldığını ve korunduğunu açıklamaktadır.
            </LegalSection>

            <LegalSection title="2. Toplanan Veriler">
              <p>Hizmetlerimizi sunmak amacıyla aşağıdaki kişisel verileri toplayabiliriz:</p>
              <ul>
                <li>Ad, soyad ve unvan bilgileri</li>
                <li>E-posta adresi ve telefon numarası</li>
                <li>Şirket/kurum bilgileri</li>
                <li>İletişim formları aracılığıyla gönderilen mesajlar</li>
                <li>Web sitesi kullanım verileri (çerezler, IP adresi, tarayıcı bilgileri)</li>
                <li>Etkinlik ve forum katılım bilgileri</li>
              </ul>
            </LegalSection>

            <LegalSection title="3. Verilerin Kullanım Amaçları">
              <p>Toplanan kişisel veriler aşağıdaki amaçlarla kullanılmaktadır:</p>
              <ul>
                <li>Hizmetlerimizin sunulması ve iyileştirilmesi</li>
                <li>İletişim taleplerinin yanıtlanması</li>
                <li>Etkinlik organizasyonu ve katılımcı yönetimi</li>
                <li>Yasal yükümlülüklerin yerine getirilmesi</li>
                <li>İş geliştirme ve forum katılım koordinasyonu</li>
                <li>Haber bülteni ve duyuruların gönderilmesi (izninizle)</li>
              </ul>
            </LegalSection>

            <LegalSection title="4. Verilerin Paylaşılması">
              Kişisel verileriniz, yasal zorunluluklar dışında üçüncü taraflarla paylaşılmaz. Hizmetlerimiz kapsamında iş ortaklarımızla (otel, havayolu, fuar organizatörleri vb.) yalnızca hizmet sunumu için gerekli minimum bilgi paylaşılabilir. Tüm iş ortaklarımız veri koruma standartlarına uymakla yükümlüdür.
            </LegalSection>

            <LegalSection title="5. Veri Güvenliği">
              Kişisel verilerinizi korumak için endüstri standardı teknik ve idari güvenlik önlemleri uygulamaktayız. SSL şifreleme, güvenli sunucular ve erişim kontrolleri kullanılmaktadır. Ancak internet üzerinden yapılan hiçbir veri iletiminin %100 güvenli olduğu garanti edilemez.
            </LegalSection>

            <LegalSection title="6. Çerezler">
              Web sitemiz, kullanıcı deneyimini iyileştirmek için çerezler kullanmaktadır. Çerezler, site performansını analiz etmek, tercihlerinizi hatırlamak ve içerikleri kişiselleştirmek amacıyla kullanılır. Tarayıcı ayarlarınızdan çerez tercihlerinizi yönetebilirsiniz.
            </LegalSection>

            <LegalSection title="7. Haklarınız">
              <p>6698 sayılı Kişisel Verilerin Korunması Kanunu kapsamında aşağıdaki haklara sahipsiniz:</p>
              <ul>
                <li>Kişisel verilerinizin işlenip işlenmediğini öğrenme</li>
                <li>İşlenmiş verilere ilişkin bilgi talep etme</li>
                <li>Verilerin işlenme amacını ve amacına uygun kullanılıp kullanılmadığını öğrenme</li>
                <li>Eksik veya yanlış işlenmiş verilerin düzeltilmesini isteme</li>
                <li>Kişisel verilerin silinmesini veya yok edilmesini talep etme</li>
                <li>İşlenen verilerin üçüncü kişilere bildirilmesini isteme</li>
                <li>Verilerinizin kanuna aykırı işlenmesi halinde zararın giderilmesini talep etme</li>
              </ul>
            </LegalSection>

            <LegalSection title="8. Saklama Süresi">
              Kişisel verileriniz, işleme amacının gerektirdiği süre boyunca ve yasal zorunluluklar çerçevesinde saklanır. Süre sona erdiğinde veriler güvenli şekilde silinir veya anonim hale getirilir.
            </LegalSection>

            <LegalSection title="9. İletişim">
              <p>Gizlilik politikamız hakkında sorularınız için bizimle iletişime geçebilirsiniz:</p>
              <p style={{ marginTop: 8 }}>
                <strong>SS Congress Uluslararası Organizasyon ve Danışmanlık</strong><br />
                Beştepe Mah. 31. Sok. No:2A Kat:9, Yenimahalle / Ankara<br />
                E-posta: info@sscongress.com<br />
                Telefon: +90 542 453 36 06
              </p>
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
