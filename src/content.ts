/**
 * ---------------------------------------------------------------------------
 * SINGLE SOURCE OF TRUTH
 * ---------------------------------------------------------------------------
 * Every string and every list on the site lives here. Nothing in `src/components`
 * or `src/scene` contains hard-coded copy.
 *
 * TODO(kemal) — replace the placeholder entries listed in `TODO.md`:
 *   1. `profile.location` / `profile.timezone`  — real city + IANA timezone
 *   2. `timeline.items`                          — real periods, employers, duties
 *   3. `projects.items`                          — real outcomes and metrics
 *   4. `toolkit.groups`                          — trim the stacks you do not use
 *   5. `services.items`                          — align with what you actually sell
 */

export type Locale = 'tr' | 'en'

export const LOCALES: { id: Locale; label: string; short: string }[] = [
  { id: 'tr', label: 'Türkçe', short: 'TR' },
  { id: 'en', label: 'English', short: 'EN' },
]

/** Accent keys map onto the palette defined in `index.css`. */
export type Accent = 'signal' | 'phosphor' | 'violet' | 'alert'

export interface Profile {
  name: string
  shortName: string
  email: string
  instagram: string
  instagramUrl: string
  location: string
  timezone: string
  availability: string
  roles: string[]
}

export const profile: Profile = {
  name: 'Kemal Talha Ekici',
  shortName: 'Kemal T. Ekici',
  email: 'kemaltalhaekici@gmail.com',
  instagram: '@kemaltalhaekici',
  instagramUrl: 'https://instagram.com/kemaltalhaekici',
  // TODO(kemal): real city
  location: 'Türkiye',
  // TODO(kemal): real IANA zone, e.g. Europe/Istanbul — drives the live clock
  timezone: 'Europe/Istanbul',
  availability: 'Açık',
  roles: ['ICT Uzmanı', 'Teknoloji Uzmanı', 'Sistem Mühendisi'],
}

export interface NavItem {
  id: SectionId
  label: string
  index: string
}

export type SectionId =
  | 'hero'
  | 'profile'
  | 'capabilities'
  | 'timeline'
  | 'services'
  | 'projects'
  | 'toolkit'
  | 'contact'

export interface Capability {
  id: string
  index: string
  title: string
  description: string
  tags: string[]
  accent: Accent
  /** Bento sizing hint: `wide` spans 2 columns, `tall` spans 2 rows. */
  span: 'normal' | 'wide' | 'tall'
  metric: { label: string; value: string }
}

export interface TimelineEntry {
  id: string
  period: string
  role: string
  org: string
  summary: string
  points: string[]
  accent: Accent
}

export interface Service {
  id: string
  index: string
  title: string
  summary: string
  deliverables: string[]
  accent: Accent
  engagement: string
}

export interface Project {
  id: string
  index: string
  title: string
  sector: string
  problem: string
  approach: string[]
  outcome: string
  stack: string[]
  accent: Accent
}

export interface ToolkitGroup {
  id: string
  label: string
  items: string[]
}

export interface SiteCopy {
  meta: { title: string; description: string }
  boot: { lines: string[]; ready: string; hint: string }
  nav: {
    items: NavItem[]
    cta: string
    openMenu: string
    closeMenu: string
    language: string
    skip: string
  }
  hud: { fps: string; scroll: string; section: string; renderer: string; mode: string }
  hero: {
    eyebrow: string
    lead: string
    roleLine: string
    primaryCta: string
    secondaryCta: string
    scrollHint: string
    availability: string
    metaLabels: { location: string; time: string; status: string; languages: string }
    languages: string
  }
  profile: {
    kicker: string
    title: string
    body: string[]
    pillars: { title: string; body: string; accent: Accent }[]
    signature: string
    signatureNote: string
  }
  capabilities: {
    kicker: string
    title: string
    intro: string
    hoverHint: string
    items: Capability[]
  }
  timeline: { kicker: string; title: string; intro: string; items: TimelineEntry[] }
  services: {
    kicker: string
    title: string
    intro: string
    items: Service[]
    cta: string
  }
  projects: { kicker: string; title: string; intro: string; items: Project[] }
  toolkit: {
    kicker: string
    title: string
    intro: string
    groups: ToolkitGroup[]
  }
  contact: {
    kicker: string
    title: string
    body: string
    emailLabel: string
    copyEmail: string
    copied: string
    instagramLabel: string
    availability: string
    responseTime: string
    form: {
      name: string
      namePlaceholder: string
      subject: string
      subjectPlaceholder: string
      message: string
      messagePlaceholder: string
      submit: string
      note: string
    }
  }
  footer: {
    rights: string
    colophon: string
    backToTop: string
    builtWith: string
  }
}

/* ========================================================================== *
 * TURKÇE
 * ========================================================================== */

const tr: SiteCopy = {
  meta: {
    title: 'Kemal Talha Ekici — ICT & Teknoloji Uzmanı',
    description:
      'ICT altyapısı, bulut ve sistem entegrasyonu, otomasyon ve yapay zeka uygulamaları üzerine uçtan uca uzmanlık.',
  },

  boot: {
    lines: [
      'KERNEL 0.9.4 — ICT RUNTIME',
      'mount /experience .................. ok',
      'index capability matrix ........... ok',
      'link network topology .............. ok',
      'start scene renderer ............... ok',
      'compile shaders .................... ok',
    ],
    ready: 'SİSTEM HAZIR',
    hint: 'kaydırmaya başla',
  },

  nav: {
    items: [
      { id: 'profile', label: 'Profil', index: '01' },
      { id: 'capabilities', label: 'Yetenekler', index: '02' },
      { id: 'timeline', label: 'Deneyim', index: '03' },
      { id: 'services', label: 'Hizmetler', index: '04' },
      { id: 'projects', label: 'Projeler', index: '05' },
      { id: 'toolkit', label: 'Araçlar', index: '06' },
      { id: 'contact', label: 'İletişim', index: '07' },
    ],
    cta: 'İletişim',
    openMenu: 'Menüyü aç',
    closeMenu: 'Menüyü kapat',
    language: 'Dili değiştir',
    skip: 'İçeriğe geç',
  },

  hud: { fps: 'FPS', scroll: 'KAYMA', section: 'BÖLÜM', renderer: 'RENDERER', mode: 'MOD' },

  hero: {
    eyebrow: 'ICT & TEKNOLOJİ UZMANI',
    lead: 'Altyapıdan uygulamalı yapay zekâya: sistemlerin kesintisiz çalışmasını sağlayan mühendislik, otomasyon ve entegrasyon.',
    roleLine: 'Ağ · Sistem · Bulut · Otomasyon · Yapay Zekâ',
    primaryCta: 'Projeleri gör',
    secondaryCta: 'İletişime geç',
    scrollHint: 'kaydır',
    availability: 'Yeni iş fırsatlarına açık',
    metaLabels: {
      location: 'Konum',
      time: 'Yerel saat',
      status: 'Durum',
      languages: 'Diller',
    },
    languages: 'Türkçe · İngilizce',
  },

  profile: {
    kicker: '01 / PROFIL',
    title: 'Teknik derinlik, operasyonel disiplin.',
    body: [
      'Bir sistemi kurmak işin başıdır; onu üretimde ayakta tutmak ise asıl mühendislik. Ağ, sunucu, depolama ve felaket kurtarma katmanlarını; kimlik, erişim ve güvenlik sınırlarını; otomasyon ve veri akışlarını birbirine bağlayan, sürdürülebilir sistemler kuruyorum.',
      'Teknoloji seçiminin arkasındaki karar mantığını, dokümantasyonu ve devralma sürecini de birlikte kuruyorum. Bir ekibe devredilen çözüm, yalnızca çalışan bir kurulum değil; onu anlayan ve üzerine inşa edebilen bir ekip için yazılmış bir belgedir.',
      'Son dönemde odağım, dil modellerini ve veri hatlarını gerçek iş akışlarına bağlayan uygulamalara kaydı: sadece çalışan bir demo değil, denetlenebilir, izlenebilir ve ölçeklenebilir sistemler.',
    ],
    pillars: [
      {
        title: 'Altyapı',
        body: 'Ağ topolojisi, sunucu platformları, depolama ve yedekleme. Kesintisiz çalışan, izlenebilir temel katman.',
        accent: 'signal',
      },
      {
        title: 'Sistem',
        body: 'Windows ve Linux, sanallaştırma, bulut, gözlem ve belgelenmiş çalışma prosedürleri.',
        accent: 'phosphor',
      },
      {
        title: 'Zekâ',
        body: 'Otomasyon, veri hatları ve dil modellerinin günlük operasyona bağlandığı uygulamalar.',
        accent: 'violet',
      },
    ],
    signature: 'Kemal Talha Ekici',
    signatureNote: 'ICT & Teknoloji Uzmanı',
  },

  capabilities: {
    kicker: '02 / YETENEKLER',
    title: 'Hangi problemi hangi katmanla çözerim?',
    intro:
      'Sekiz çalışma alanı. Her biri ölçülebilir bir çıktıya bağlanır; aralarındaki geçişlerde tek bir operasyon görünürlüğü korunur.',
    hoverHint: 'Kartın üzerine gel — sahne yeniden renklenir',
    items: [
      {
        id: 'network',
        index: '01',
        title: 'Ağ & Altyapı',
        description:
          'Katman 2/3 ağ tasarımı, yönlendirme ve anahtarlama, VPN ve uzak erişim, yapılandırılmış kablolama, darboğaz analizi ve saha devreye alma.',
        tags: ['Routing & Switching', 'VPN', 'LAN / WAN', 'Kablolama', 'Performans'],
        accent: 'signal',
        span: 'wide',
        metric: { label: 'Katman', value: 'L2 → L7' },
      },
      {
        id: 'systems',
        index: '02',
        title: 'Bulut & Sistemler',
        description:
          'Windows Server, Linux, sanallaştırma, yedekleme stratejisi, yüksek erişilebilirlik ve ortamların standartlaştırılması.',
        tags: ['Windows Server', 'Linux', 'Sanallaştırma', 'Yedekleme', 'HA'],
        accent: 'phosphor',
        span: 'normal',
        metric: { label: 'SLA', value: '99.9' },
      },
      {
        id: 'security',
        index: '03',
        title: 'Siber Güvenlik',
        description:
          'Kimlik ve erişim yönetimi, uç ve ağ güvenliği, sıkılaştırma temelleri, olay müdahalesi ve denetlenebilir erişim politikaları.',
        tags: ['IAM', 'Endpoint & Network', 'Hardening', 'Incident Response'],
        accent: 'alert',
        span: 'normal',
        metric: { label: 'Odak', value: 'Zero Trust' },
      },
      {
        id: 'automation',
        index: '04',
        title: 'Otomasyon & DevOps',
        description:
          'Betik yazımı, iş akışı otomasyonu, sürekli entegrasyon ve dağıtım, altyapı kodla, idempotent ve denetlenebilir yapılar.',
        tags: ['PowerShell', 'Bash', 'Python', 'CI/CD', 'IaC'],
        accent: 'violet',
        span: 'tall',
        metric: { label: 'Süreklilik', value: 'Sıfır Dokunuş' },
      },
      {
        id: 'data',
        index: '05',
        title: 'Veri & Entegrasyon',
        description:
          'İlişkisel veritabanları, ETL akışları, API ve middleware katmanları, veri kalitesi ve izleme.',
        tags: ['SQL', 'ETL', 'API', 'Middleware', 'İzleme'],
        accent: 'signal',
        span: 'normal',
        metric: { label: 'Format', value: 'SQL / JSON' },
      },
      {
        id: 'ai',
        index: '06',
        title: 'Yapay Zekâ Uygulamaları',
        description:
          'Dil modellerinin kurum içi veriye bağlanması, RAG hatları, model dağıtımı, değerlendirme setleri ve maliyet kontrolü.',
        tags: ['LLM', 'RAG', 'Model Dağıtımı', 'MLOps', 'Değerlendirme'],
        accent: 'phosphor',
        span: 'wide',
        metric: { label: 'Bağlam', value: 'Kurumsal' },
      },
      {
        id: 'leadership',
        index: '07',
        title: 'Teknik Liderlik',
        description:
          'Runbook ve dokümantasyon standardı, eğitim, mentorluk, olay yönetimi disiplini ve devir süreçleri.',
        tags: ['Runbook', 'Dokümantasyon', 'Eğitim', 'Mentorluk'],
        accent: 'violet',
        span: 'normal',
        metric: { label: 'Çıktı', value: 'Devredilebilir' },
      },
      {
        id: 'web',
        index: '08',
        title: 'Web & Arayüz',
        description:
          'React, TypeScript, WebGL/Three.js ile gerçek zamanlı arayüzler; performans bütçesi, erişilebilirlik ve ölçeklenebilir bileşen mimarisi.',
        tags: ['React', 'TypeScript', 'Three.js', 'Performans', 'A11y'],
        accent: 'signal',
        span: 'normal',
        metric: { label: 'Bu site', value: '3D WebGL' },
      },
    ],
  },

  timeline: {
    kicker: '03 / DENEYİM',
    title: 'Kariyer hattı',
    intro:
      'Sıralı roller, sorumluluğun genişlediği bir çizgi. Her satır, çalışılan sistemlerin arkasında bıraktığı iz.',
    items: [
      {
        id: 't1',
        period: '2019 — 2022',
        role: 'ICT Operasyon & Altyapı',
        org: 'Kurum içi',
        summary: 'Ağ altyapısı, kullanıcı destek ve sistem işletimi.',
        points: [
          'Kurum içi LAN/WAN topolojisinin kurulumu ve işletimi',
          'Windows Server ve aktif dizin hizmetlerinin yönetimi',
          'Kullanıcı, cihaz ve erişim taleplerinin uçtan uca karşılanması',
        ],
        accent: 'signal',
      },
      {
        id: 't2',
        period: '2022 — 2024',
        role: 'Sistem Mühendisi',
        org: 'Kurum içi',
        summary: 'Sunucu platformları, sanallaştırma ve yedekleme mimarisi.',
        points: [
          'Sanallaştırma altyapısının kurulumu ve kapasite planlaması',
          'Yedekleme ve felaket kurtarma stratejisinin tasarımı',
          'Performans darboğazlarının kök neden analizi',
        ],
        accent: 'phosphor',
      },
      {
        id: 't3',
        period: '2024 — 2025',
        role: 'Bulut & Entegrasyon Uzmanı',
        org: 'Kurum içi',
        summary: 'Hibrit bulut, kimlik, API katmanları ve gözlem.',
        points: [
          'Hibrit ortamın hibrit kimlik ve API katmanlarıyla birleştirilmesi',
          'Log toplama, metrikler ve alarm eşiklerinin devreye alınması',
          'Dokümantasyon ve runbook standardının oluşturulması',
        ],
        accent: 'violet',
      },
      {
        id: 't4',
        period: '2025 —',
        role: 'Teknoloji & Yapay Zekâ Uzmanı',
        org: 'Serbest / Danışmanlık',
        summary: 'Otomasyon ve dil modellerinin iş akışına bağlanması.',
        points: [
          'İç süreçlerin betik ve API ile otomatikleştirilmesi',
          'Kurum içi dokümanlar üzerinde RAG tabanlı asistan kurulumu',
          'Teknik eğitim, mentorluk ve devir süreçlerinin yürütülmesi',
        ],
        accent: 'signal',
      },
    ],
  },

  services: {
    kicker: '04 / HİZMETLER',
    title: 'Birlikte çalışabileceğimiz alanlar',
    intro:
      'Kurum içi ekip, kısa süreli uzman desteği veya danışmanlık. Kapsam net, çıktı belgeli, devredilebilir.',
    items: [
      {
        id: 's1',
        index: '01',
        title: 'Altyapı & Ağ Mühendisliği',
        summary:
          'Mevcut ağın yeniden tasarlanması, güvenliği sağlanması ve üretime kesintisiz geçirilmesi.',
        deliverables: [
          'Topoloji ve IP planlaması',
          'Segmentasyon ve erişim politikaları',
          'Saha kurulumu ve geçiş planı',
        ],
        accent: 'signal',
        engagement: 'Kısa-orta vadeli',
      },
      {
        id: 's2',
        index: '02',
        title: 'Bulut & Sistem Entegrasyonu',
        summary:
          'Sunucu ortamlarının standardizasyonu, hibrit mimari ve felaket kurtarma hazırlığı.',
        deliverables: [
          'Ortam standardizasyonu',
          'Yedekleme ve DR planı',
          'İzleme ve alarm mimarisi',
        ],
        accent: 'phosphor',
        engagement: 'Orta vadeli',
      },
      {
        id: 's3',
        index: '03',
        title: 'Otomasyon & Yapay Zekâ Uygulamaları',
        summary:
          'Tekrarlayan operasyonel yükün kaldırılması ve dil modellerinin ölçülebilir bir iş akışına bağlanması.',
        deliverables: [
          'Süreç otomasyonu ve betik kütüphanesi',
          'RAG tabanlı kurum içi asistan',
          'Değerlendirme seti ve maliyet takibi',
        ],
        accent: 'violet',
        engagement: 'Proje bazlı',
      },
      {
        id: 's4',
        index: '04',
        title: 'Teknik Eğitim & DevOps Danışmanlığı',
        summary:
          'Ekibin yetkinlik kazanması, süreçlerin otomatikleşmesi ve teslimatın devredilebilir hâle gelmesi.',
        deliverables: [
          'Müfredat ve atölye',
          'CI/CD ve IaC süreçlerinin kurulması',
          'Runbook ve dokümantasyon standardı',
        ],
        accent: 'alert',
        engagement: 'Uzman desteği',
      },
    ],
    cta: 'Görüşmeyi planlayın',
  },

  projects: {
    kicker: '05 / PROJELER',
    title: 'Seçilmiş çalışmalar',
    intro:
      'Kurum içi operasyonlardan yapay zekâ uygulamalarına uzanan uçtan uca örnekler.',
    items: [
      {
        id: 'p1',
        index: '01',
        title: 'Kesintisiz Ağ Yenileme',
        sector: 'Kurumsal Ağ',
        problem:
          'Yıllardır büyüyen ana omurga, yeni servislerin eklenmesini engelliyor ve planlı bakım pencerelerini zorunlu kılıyordu.',
        approach: [
          'Yeni topolojinin paralel olarak kurulması',
          'Segment bazlı geçiş pencerelerinin planlanması',
          'Yeni segmentte SLO ve alarm eşiklerinin tanımlanması',
        ],
        outcome:
          'Geçiş, kullanıcı kesintisi olmadan tamamlandı; bakım penceresi ihtiyacı ortadan kalktı.',
        stack: ['Cisco IOS-XE', 'BGP', 'SNMP', 'Ansible'],
        accent: 'signal',
      },
      {
        id: 'p2',
        index: '02',
        title: 'Felaket Kurtarma Mimarisi',
        sector: 'Sunucu Ortamı',
        problem:
          'Yedekleme çalışıyordu ama geri yükleme hiç denenmemişti; gerçek bir arıza anında ölçülebilir bir süre yoktu.',
        approach: [
          'RPO/RTO hedeflerinin iş süreçleriyle eşleştirilmesi',
          'Yedekleme kapsamının doğrulanması',
          'Periyodik geri yükleme tatbikatlarının otomasyonu',
        ],
        outcome:
          'Felaket senaryosu yazılı olarak doğrulandı; geri yükleme süresi ölçülebilir ve tekrarlanabilir hâle geldi.',
        stack: ['Proxmox', 'ZFS', 'REST', 'Prometheus'],
        accent: 'phosphor',
      },
      {
        id: 'p3',
        index: '03',
        title: 'Operasyonel Otomasyon Platformu',
        sector: 'BT Operasyonu',
        problem:
          'Tekrarlayan görevler dağıtık betiklerde yaşıyordu; her çalıştırma farklı sonuç veriyordu.',
        approach: [
          'Betiklerin ortak bir kütüphaneye ve sürüm kontrolüne alınması',
          'Merkezi günlük, hata yakalama ve yeniden deneme katmanı',
          'Planlı işlerin tek panelden yönetilmesi',
        ],
        outcome:
          'Yinelenen işler tek komutla, denetlenebilir ve geri alınabilir biçimde çalışır hâle geldi.',
        stack: ['Python', 'PowerShell', 'GitLab CI', 'REST API'],
        accent: 'violet',
      },
      {
        id: 'p4',
        index: '04',
        title: 'Kurum İçi Bilgi Asistanı',
        sector: 'Yapay Zekâ',
        problem:
          'Dağınık dokümantasyon, kurum içi sorulara hızlı ve güvenilir yanıt veremiyordu.',
        approach: [
          'Dokümanların bölümlenip yeniden yazılmadan önce erişim politikasının belirlenmesi',
          'Yerel dil modeli üzerinde RAG hattının kurulması',
          'Değerlendirme seti ve alıntı doğrulama katmanının eklenmesi',
        ],
        outcome:
          'Asistan yalnızca erişimi olan kaynaklardan, alıntıyla birlikte yanıt verecek şekilde devreye alındı.',
        stack: ['Ollama', 'LangChain', 'PostgreSQL', 'pgvector'],
        accent: 'alert',
      },
    ],
  },

  toolkit: {
    kicker: '06 / ARAÇLAR',
    title: 'Günlük çalışma yığını',
    intro:
      'Alışkanlık değil, tercih. Her araç, ölçülebilir bir işi daha hızlı ve daha güvenilir hâle getirdiği için burada.',
    groups: [
      {
        id: 't-net',
        label: 'Ağ & Altyapı',
        items: ['Cisco IOS / IOS-XE', 'MikroTik RouterOS', 'FortiGate', 'pfSense', 'BGP / OSPF', 'VLAN / QinQ', 'MPLS', 'Fiber & Yapılandırılmış Kablolama'],
      },
      {
        id: 't-sys',
        label: 'Sistemler',
        items: ['Windows Server', 'Active Directory / LDAP', 'Linux (Debian, RHEL)', 'VMware / Proxmox', 'NAS / SAN', 'Microsoft 365', 'Google Workspace'],
      },
      {
        id: 't-cloud',
        label: 'Bulut & DevOps',
        items: ['Docker', 'GitLab CI', 'Ansible', 'Terraform', 'Kubernetes', 'Git', 'Harbor', 'ArgoCD'],
      },
      {
        id: 't-sec',
        label: 'Güvenlik',
        items: ['Keycloak / OIDC', 'Wazuh', 'CrowdStrike', 'LAPS', 'Bitwarden', 'TLS / PKI', 'Firewall Policy Review'],
      },
      {
        id: 't-data',
        label: 'Veri & Yapay Zekâ',
        items: ['PostgreSQL', 'MySQL', 'Redis', 'Python', 'Pandas', 'OpenAI API', 'Ollama', 'LangChain', 'pgvector'],
      },
      {
        id: 't-web',
        label: 'Web',
        items: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'Three.js', 'React Three Fiber', 'GSAP', 'Lenis'],
      },
    ],
  },

  contact: {
    kicker: '07 / İLETİŞİM',
    title: 'Bir sistem üzerinde birlikte çalışalım.',
    body:
      'Bir altyapı modernize edilecek, bir süreç otomatikleştirilecek ya da ekibin yetkinliği artırılacak isen yazın. Mesajınız doğrudan e-posta olarak açılır — kayıt, form, üçüncü taraf servis yok.',
    emailLabel: 'E-posta',
    copyEmail: 'Kopyala',
    copied: 'Kopyalandı',
    instagramLabel: 'Instagram',
    availability: 'Yeni iş fırsatlarına açık',
    responseTime: 'Yanıt süresi: aynı gün',
    form: {
      name: 'Ad',
      namePlaceholder: 'Adınız',
      subject: 'Konu',
      subjectPlaceholder: 'Neyi çözüyoruz?',
      message: 'Mesaj',
      messagePlaceholder: 'Bağlam, kapsam ve zamanlama…',
      submit: 'E-posta olarak aç',
      note: 'Gönder butonu, alanları doldurulmuş bir e-posta iletisi açar.',
    },
  },

  footer: {
    rights: 'Tüm hakları saklıdır.',
    colophon: 'Tasarım ve kod sıfırdan yazıldı.',
    backToTop: 'Yukarı',
    builtWith: 'React · TypeScript · Three.js · Tailwind',
  },
}

/* ========================================================================== *
 * ENGLISH
 * ========================================================================== */

const en: SiteCopy = {
  meta: {
    title: 'Kemal Talha Ekici — ICT & Technology Specialist',
    description:
      'End-to-end expertise across ICT infrastructure, cloud and systems integration, automation and applied AI.',
  },

  boot: {
    lines: [
      'KERNEL 0.9.4 — ICT RUNTIME',
      'mount /experience .................. ok',
      'index capability matrix ........... ok',
      'link network topology .............. ok',
      'start scene renderer ............... ok',
      'compile shaders .................... ok',
    ],
    ready: 'SYSTEM READY',
    hint: 'start scrolling',
  },

  nav: {
    items: [
      { id: 'profile', label: 'Profile', index: '01' },
      { id: 'capabilities', label: 'Expertise', index: '02' },
      { id: 'timeline', label: 'Experience', index: '03' },
      { id: 'services', label: 'Services', index: '04' },
      { id: 'projects', label: 'Work', index: '05' },
      { id: 'toolkit', label: 'Toolkit', index: '06' },
      { id: 'contact', label: 'Contact', index: '07' },
    ],
    cta: 'Contact',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    language: 'Change language',
    skip: 'Skip to content',
  },

  hud: { fps: 'FPS', scroll: 'SCROLL', section: 'SECTION', renderer: 'RENDERER', mode: 'MODE' },

  hero: {
    eyebrow: 'ICT & TECHNOLOGY SPECIALIST',
    lead: 'From infrastructure to applied AI: engineering, automation and integration that keeps systems running without interruption.',
    roleLine: 'Network · Systems · Cloud · Automation · AI',
    primaryCta: 'See the work',
    secondaryCta: 'Get in touch',
    scrollHint: 'scroll',
    availability: 'Open to new work',
    metaLabels: {
      location: 'Location',
      time: 'Local time',
      status: 'Status',
      languages: 'Languages',
    },
    languages: 'Turkish · English',
  },

  profile: {
    kicker: '01 / PROFILE',
    title: 'Technical depth, operational discipline.',
    body: [
      'Building a system is where the work starts; keeping it standing in production is where the engineering actually is. I connect networks, servers, storage and disaster recovery layers with identity, access and security boundaries, then bind them together with automation and data pipelines that survive handover.',
      'I build the decision logic behind every technology choice together with the documentation and the transition plan. A solution handed to a team is not just a running install — it is a written system that the team can understand and build on.',
      'My recent focus is applying language models and data pipelines to real operational workflows: not a demo that works, but systems that are auditable, observable and scalable.',
    ],
    pillars: [
      {
        title: 'Infrastructure',
        body: 'Network topology, server platforms, storage and backup. A foundation that runs without interruption and can be observed.',
        accent: 'signal',
      },
      {
        title: 'Systems',
        body: 'Windows and Linux, virtualisation, cloud, observability and documented operating procedures.',
        accent: 'phosphor',
      },
      {
        title: 'Intelligence',
        body: 'Automation, data pipelines and language models wired into day-to-day operations.',
        accent: 'violet',
      },
    ],
    signature: 'Kemal Talha Ekici',
    signatureNote: 'ICT & Technology Specialist',
  },

  capabilities: {
    kicker: '02 / EXPERTISE',
    title: 'Which layer solves which problem?',
    intro:
      'Eight practice areas. Each one ends in a measurable deliverable, and the transitions between them keep a single operating picture.',
    hoverHint: 'Hover a card — the scene re-tints',
    items: [
      {
        id: 'network',
        index: '01',
        title: 'Network & Infrastructure',
        description:
          'Layer 2/3 design, routing and switching, VPN and remote access, structured cabling, bottleneck analysis and site commissioning.',
        tags: ['Routing & Switching', 'VPN', 'LAN / WAN', 'Cabling', 'Performance'],
        accent: 'signal',
        span: 'wide',
        metric: { label: 'Layers', value: 'L2 → L7' },
      },
      {
        id: 'systems',
        index: '02',
        title: 'Cloud & Systems',
        description:
          'Windows Server, Linux, virtualisation, backup strategy, high availability and standardising environments.',
        tags: ['Windows Server', 'Linux', 'Virtualisation', 'Backup', 'HA'],
        accent: 'phosphor',
        span: 'normal',
        metric: { label: 'Target', value: '99.9' },
      },
      {
        id: 'security',
        index: '03',
        title: 'Cybersecurity',
        description:
          'Identity and access management, endpoint and network security, hardening baselines, incident response and auditable access policy.',
        tags: ['IAM', 'Endpoint & Network', 'Hardening', 'Incident Response'],
        accent: 'alert',
        span: 'normal',
        metric: { label: 'Model', value: 'Zero Trust' },
      },
      {
        id: 'automation',
        index: '04',
        title: 'Automation & DevOps',
        description:
          'Scripting, workflow automation, continuous integration and delivery, infrastructure as code — idempotent and reviewable.',
        tags: ['PowerShell', 'Bash', 'Python', 'CI/CD', 'IaC'],
        accent: 'violet',
        span: 'tall',
        metric: { label: 'Touch', value: 'Zero' },
      },
      {
        id: 'data',
        index: '05',
        title: 'Data & Integration',
        description:
          'Relational databases, ETL pipelines, API and middleware layers, data quality and monitoring.',
        tags: ['SQL', 'ETL', 'API', 'Middleware', 'Monitoring'],
        accent: 'signal',
        span: 'normal',
        metric: { label: 'Format', value: 'SQL / JSON' },
      },
      {
        id: 'ai',
        index: '06',
        title: 'Applied AI',
        description:
          'Wiring language models to institutional data: RAG pipelines, model deployment, evaluation sets and cost control.',
        tags: ['LLM', 'RAG', 'Model Deployment', 'MLOps', 'Evaluation'],
        accent: 'phosphor',
        span: 'wide',
        metric: { label: 'Context', value: 'Enterprise' },
      },
      {
        id: 'leadership',
        index: '07',
        title: 'Technical Leadership',
        description:
          'Runbook and documentation standards, training, mentoring, incident discipline and handover processes.',
        tags: ['Runbook', 'Documentation', 'Training', 'Mentoring'],
        accent: 'violet',
        span: 'normal',
        metric: { label: 'Output', value: 'Handover-ready' },
      },
      {
        id: 'web',
        index: '08',
        title: 'Web & Interface',
        description:
          'React, TypeScript and WebGL/Three.js for real-time interfaces — performance budgets, accessibility and a component model that scales.',
        tags: ['React', 'TypeScript', 'Three.js', 'Performance', 'A11y'],
        accent: 'signal',
        span: 'normal',
        metric: { label: 'This site', value: '3D WebGL' },
      },
    ],
  },

  timeline: {
    kicker: '03 / EXPERIENCE',
    title: 'Career track',
    intro:
      'Sequential roles, widening scope. Each line is the trace left behind by the systems that were run.',
    items: [
      {
        id: 't1',
        period: '2019 — 2022',
        role: 'ICT Operations & Infrastructure',
        org: 'In-house',
        summary: 'Network infrastructure, user support and systems operation.',
        points: [
          'Built and operated the in-house LAN/WAN topology',
          'Managed Windows Server and directory services',
          'Handled user, device and access requests end to end',
        ],
        accent: 'signal',
      },
      {
        id: 't2',
        period: '2022 — 2024',
        role: 'Systems Engineer',
        org: 'In-house',
        summary: 'Server platforms, virtualisation and backup architecture.',
        points: [
          'Deployed virtualisation infrastructure and planned capacity',
          'Designed the backup and disaster recovery strategy',
          'Ran root-cause analysis on performance bottlenecks',
        ],
        accent: 'phosphor',
      },
      {
        id: 't3',
        period: '2024 — 2025',
        role: 'Cloud & Integration Specialist',
        org: 'In-house',
        summary: 'Hybrid cloud, identity, API layers and observability.',
        points: [
          'Unified the hybrid estate with hybrid identity and API layers',
          'Introduced log collection, metrics and alert thresholds',
          'Created the documentation and runbook standard',
        ],
        accent: 'violet',
      },
      {
        id: 't4',
        period: '2025 — ',
        role: 'Technology & AI Specialist',
        org: 'Independent / Advisory',
        summary: 'Automation and language models wired into operations.',
        points: [
          'Automated internal processes with scripts and APIs',
          'Built a RAG assistant over institutional documentation',
          'Ran technical training, mentoring and handover processes',
        ],
        accent: 'signal',
      },
    ],
  },

  services: {
    kicker: '04 / SERVICES',
    title: 'Where we can work together',
    intro:
      'In-house team, short-term specialist support or advisory. Clear scope, documented output, handover-ready.',
    items: [
      {
        id: 's1',
        index: '01',
        title: 'Infrastructure & Network Engineering',
        summary:
          'Redesign the network, secure it, and move it into production without interruption.',
        deliverables: [
          'Topology and IP addressing plan',
          'Segmentation and access policies',
          'Site installation and cutover plan',
        ],
        accent: 'signal',
        engagement: 'Short to mid-term',
      },
      {
        id: 's2',
        index: '02',
        title: 'Cloud & Systems Integration',
        summary:
          'Standardise server environments, design hybrid architecture and prepare for disaster recovery.',
        deliverables: [
          'Environment standardisation',
          'Backup and DR plan',
          'Monitoring and alerting architecture',
        ],
        accent: 'phosphor',
        engagement: 'Mid-term',
      },
      {
        id: 's3',
        index: '03',
        title: 'Automation & Applied AI',
        summary:
          'Remove repetitive operational load and wire language models into a measurable workflow.',
        deliverables: [
          'Process automation and script library',
          'RAG-based institutional assistant',
          'Evaluation set and cost tracking',
        ],
        accent: 'violet',
        engagement: 'Project based',
      },
      {
        id: 's4',
        index: '04',
        title: 'Technical Enablement & DevOps Advisory',
        summary:
          'Grow the team’s capability, automate delivery and make the outcome handover-ready.',
        deliverables: [
          'Curriculum and workshops',
          'CI/CD and IaC process setup',
          'Runbook and documentation standard',
        ],
        accent: 'alert',
        engagement: 'Specialist support',
      },
    ],
    cta: 'Schedule a conversation',
  },

  projects: {
    kicker: '05 / WORK',
    title: 'Selected engagements',
    intro:
      'From in-house operations to applied AI — end-to-end examples.',
    items: [
      {
        id: 'p1',
        index: '01',
        title: 'Zero-Downtime Network Renewal',
        sector: 'Enterprise Network',
        problem:
          'A backbone that had grown for years blocked new services and forced scheduled maintenance windows on every change.',
        approach: [
          'Built the new topology in parallel',
          'Planned segment-by-segment cutover windows',
          'Defined SLOs and alert thresholds on the new segment',
        ],
        outcome:
          'The cutover completed with no user interruption and the recurring maintenance window disappeared.',
        stack: ['Cisco IOS-XE', 'BGP', 'SNMP', 'Ansible'],
        accent: 'signal',
      },
      {
        id: 'p2',
        index: '02',
        title: 'Disaster Recovery Architecture',
        sector: 'Server Estate',
        problem:
          'Backups ran, but a restore had never been tested — and there was no measurable time-to-recovery during a real incident.',
        approach: [
          'Matched RPO/RTO targets to actual business processes',
          'Verified backup coverage against real recovery scope',
          'Automated periodic restore drills',
        ],
        outcome:
          'The disaster scenario was verified in software; recovery time became measurable and repeatable.',
        stack: ['Proxmox', 'ZFS', 'REST', 'Prometheus'],
        accent: 'phosphor',
      },
      {
        id: 'p3',
        index: '03',
        title: 'Operational Automation Platform',
        sector: 'IT Operations',
        problem:
          'Repetitive tasks lived in scattered scripts, and every run produced a slightly different result.',
        approach: [
          'Moved scripts into a shared, version-controlled library',
          'Added central logging, error capture and retry handling',
          'Managed scheduled jobs from a single panel',
        ],
        outcome:
          'Repeated operations now run from one command, are auditable, and can be reversed.',
        stack: ['Python', 'PowerShell', 'GitLab CI', 'REST API'],
        accent: 'violet',
      },
      {
        id: 'p4',
        index: '04',
        title: 'Institutional Knowledge Assistant',
        sector: 'Applied AI',
        problem:
          'Documentation was scattered, so internal questions could not be answered quickly or reliably.',
        approach: [
          'Defined access policy before chunking and indexing documents',
          'Built a RAG pipeline on a local language model',
          'Added an evaluation set and citation verification layer',
        ],
        outcome:
          'The assistant answers only from sources the requester can access, and cites every claim.',
        stack: ['Ollama', 'LangChain', 'PostgreSQL', 'pgvector'],
        accent: 'alert',
      },
    ],
  },

  toolkit: {
    kicker: '06 / TOOLKIT',
    title: 'Daily stack',
    intro:
      'Not habit — preference. Every tool is here because it made a measurable job faster or safer.',
    groups: [
      {
        id: 't-net',
        label: 'Network & Infrastructure',
        items: ['Cisco IOS / IOS-XE', 'MikroTik RouterOS', 'FortiGate', 'pfSense', 'BGP / OSPF', 'VLAN / QinQ', 'MPLS', 'Fiber & Structured Cabling'],
      },
      {
        id: 't-sys',
        label: 'Systems',
        items: ['Windows Server', 'Active Directory / LDAP', 'Linux (Debian, RHEL)', 'VMware / Proxmox', 'NAS / SAN', 'Microsoft 365', 'Google Workspace'],
      },
      {
        id: 't-cloud',
        label: 'Cloud & DevOps',
        items: ['Docker', 'GitLab CI', 'Ansible', 'Terraform', 'Kubernetes', 'Git', 'Harbor', 'ArgoCD'],
      },
      {
        id: 't-sec',
        label: 'Security',
        items: ['Keycloak / OIDC', 'Wazuh', 'CrowdStrike', 'LAPS', 'Bitwarden', 'TLS / PKI', 'Firewall Policy Review'],
      },
      {
        id: 't-data',
        label: 'Data & AI',
        items: ['PostgreSQL', 'MySQL', 'Redis', 'Python', 'Pandas', 'OpenAI API', 'Ollama', 'LangChain', 'pgvector'],
      },
      {
        id: 't-web',
        label: 'Web',
        items: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'Three.js', 'React Three Fiber', 'GSAP', 'Lenis'],
      },
    ],
  },

  contact: {
    kicker: '07 / CONTACT',
    title: 'Let’s work on a system together.',
    body:
      'Modernising infrastructure, automating a process, or raising the capability of a team — write to me. Your message opens directly in an email client: no registration, no form service, no third party.',
    emailLabel: 'Email',
    copyEmail: 'Copy',
    copied: 'Copied',
    instagramLabel: 'Instagram',
    availability: 'Open to new work',
    responseTime: 'Response time: same day',
    form: {
      name: 'Name',
      namePlaceholder: 'Your name',
      subject: 'Subject',
      subjectPlaceholder: 'What are we solving?',
      message: 'Message',
      messagePlaceholder: 'Context, scope and timing…',
      submit: 'Open in email client',
      note: 'The submit button opens a pre-filled email with the fields above.',
    },
  },

  footer: {
    rights: 'All rights reserved.',
    colophon: 'Designed and written from scratch.',
    backToTop: 'Back to top',
    builtWith: 'React · TypeScript · Three.js · Tailwind',
  },
}

export const copy: Record<Locale, SiteCopy> = { tr, en }

export const sectionOrder: SectionId[] = [
  'hero',
  'profile',
  'capabilities',
  'timeline',
  'services',
  'projects',
  'toolkit',
  'contact',
]
