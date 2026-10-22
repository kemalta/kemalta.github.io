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
  linkedin: string
  linkedinUrl: string
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
  linkedin: 'in/kemal-talha-ekici',
  linkedinUrl: 'https://www.linkedin.com/in/kemal-talha-ekici-247712254/',
  // TODO(kemal): real city
  location: 'Türkiye',
  // TODO(kemal): real IANA zone, e.g. Europe/Istanbul — drives the live clock
  timezone: 'Europe/Istanbul',
  availability: 'Danışmanlık ve iş birliği',
  roles: ['Siber Güvenlik', 'Otomasyon & Yapay Zekâ', 'ICT & Sistem'],
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
    linkedinLabel: string
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
    title: 'Kemal Talha Ekici — Siber Güvenlik, Otomasyon, ICT',
    description:
      'Kurumsal işletmeler için siber güvenlik, otomasyon ve yapay zekâ çözümleri; network, sunucu ve ICT altyapısı; web sitesi çözümleri.',
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
    eyebrow: 'Siber Güvenlik · Otomasyon · ICT',
    lead: 'Kurumsal işletmeler için siber güvenlik, otomasyon ve yapay zekâ çözümleri; ağ, sunucu ve ICT altyapısından web arayüzlerine kadar uçtan uca.',
    roleLine: 'Siber Güvenlik · Otomasyon · Yapay Zekâ · Network · Sunucu · Web',
    primaryCta: 'Projeleri gör',
    secondaryCta: 'İletişime geç',
    scrollHint: 'kaydır',
    availability: 'Danışmanlık ve iş birliği için ulaşın',
    metaLabels: {
      location: 'Konum',
      time: 'Yerel saat',
      status: 'Durum',
      languages: 'Diller',
    },
    languages: 'Türkçe · İngilizce',
  },

  profile: {
    kicker: '01 / PROFİL',
    title: 'Teknik derinlik, operasyonel disiplin.',
    body: [
      'Sistem kurmak işin başı; onu üretimde güvenle ayakta tutmak asıl mühendislik. Ağ, sunucu, depolama ve felaket kurtarma katmanlarını kimlik, erişim ve siber güvenlik sınırlarıyla birleştiriyor; otomasyon ve veri akışlarıyla sürdürülebilir hâle getiriyorum.',
      'Teknoloji seçiminin gerekçesini, dokümantasyonu ve devir planını birlikte kuruyorum. Bir ekibe devredilen çözüm yalnızca çalışan bir kurulum değil; anlaşılabilen ve üzerine inşa edilebilen bir sistemdir.',
      'Son dönemde odağım kurumsal işletmelerde otomasyon: dil modellerini ve veri hatlarını gerçek operasyona bağlıyorum. Çalışan bir demo değil; denetlenebilir, izlenebilir ve ölçeklenebilir sistemler.',
    ],
    pillars: [
      {
        title: 'Altyapı',
        body: 'Ağ topolojisi, sunucu platformları, depolama ve yedekleme. Kesintisiz çalışan, izlenebilir bir temel katman.',
        accent: 'signal',
      },
      {
        title: 'Sistem',
        body: 'Windows ve Linux, sanallaştırma, hibrit bulut, izleme ve yazılı çalışma prosedürleri.',
        accent: 'phosphor',
      },
      {
        title: 'Zekâ',
        body: 'Otomasyon, veri hatları ve dil modellerini günlük operasyona bağlayan ölçülebilir uygulamalar.',
        accent: 'violet',
      },
    ],
    signature: 'Kemal Talha Ekici',
    signatureNote: 'Siber Güvenlik · Otomasyon · ICT',
  },

  capabilities: {
    kicker: '02 / YETENEKLER',
    title: 'Hangi problemi hangi katmanla çözerim?',
    intro:
      'Sekiz çalışma alanı, tek operasyon görünürlüğü. Her alan ölçülebilir bir çıktıya bağlanır; aralarındaki geçişler kopmaz.',
    hoverHint: 'Kartın üzerine gel — sahne yeniden renklenir',
    items: [
      {
        id: 'network',
        index: '01',
        title: 'Ağ & Altyapı',
        description:
          'Katman 2/3 ağ tasarımı, yönlendirme ve anahtarlama, VPN ve uzak erişim, yapılandırılmış kablolama. Darboğaz analizi ve saha devreye alma ile üretime alınır.',
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
          'Windows Server, Linux, sanallaştırma, yedekleme stratejisi ve yüksek erişilebilirlik. Ortamlar standartlaşır, kapasite öngörülebilir olur.',
        tags: ['Windows Server', 'Linux', 'Sanallaştırma', 'Yedekleme', 'HA'],
        accent: 'phosphor',
        span: 'normal',
        metric: { label: 'Hedef', value: '99.9' },
      },
      {
        id: 'security',
        index: '03',
        title: 'Siber Güvenlik',
        description:
          'Kimlik ve erişim yönetimi, uç ve ağ güvenliği, sıkılaştırma temelleri. Kurumsal ortamda olay müdahalesi ve denetlenebilir erişim politikalarıyla birlikte kurulur.',
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
          'Kurumsal işletmelerde betik, iş akışı otomasyonu, CI/CD ve altyapı kodla. İdempotent, sürüm kontrollü ve geri alınabilir yapılar.',
        tags: ['PowerShell', 'Bash', 'Python', 'CI/CD', 'IaC'],
        accent: 'violet',
        span: 'tall',
        metric: { label: 'Dokunuş', value: 'Sıfır' },
      },
      {
        id: 'data',
        index: '05',
        title: 'Veri & Entegrasyon',
        description:
          'İlişkisel veritabanları, ETL akışları, API ve middleware katmanları. Veri kalitesi ve izleme ile uçtan uca takip.',
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
          'Dil modellerinin kurum içi veriye bağlanması: RAG hatları, model dağıtımı, değerlendirme setleri ve maliyet kontrolü.',
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
          'Runbook ve dokümantasyon standardı, eğitim ve mentorluk, olay yönetimi disiplini, devredilebilir süreçler.',
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
          'React, TypeScript ve WebGL/Three.js ile gerçek zamanlı arayüzler. Performans bütçesi, erişilebilirlik ve ölçeklenen bileşen mimarisi.',
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
      'Sorumluluğun kademeli olarak genişlediği dört dönem. Her satır, işletilen sistemlerin arkasında bıraktığı iz.',
    items: [
      {
        id: 't1',
        period: '2019 — 2022',
        role: 'ICT Operasyon & Altyapı',
        org: 'Kurumsal BT',
        summary: 'Ağ altyapısı, kullanıcı desteği ve sistem işletimi.',
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
        org: 'Kurumsal BT',
        summary: 'Sunucu platformları, sanallaştırma ve yedekleme mimarisi.',
        points: [
          'Sanallaştırma altyapısının kurulumu ve kapasite planlaması',
          'Yedekleme ve felaket kurtarma stratejisinin tasarımı',
          'Performans darboğazlarında kök neden analizi',
        ],
        accent: 'phosphor',
      },
      {
        id: 't3',
        period: '2024 — 2025',
        role: 'Bulut & Entegrasyon Uzmanı',
        org: 'Kurumsal BT',
        summary: 'Hibrit bulut, kimlik, API katmanları ve izleme.',
        points: [
          'Hibrit ortamın kimlik ve API katmanlarıyla birleştirilmesi',
          'Log toplama, metrik ve alarm eşiklerinin devreye alınması',
          'Dokümantasyon ve runbook standardının oluşturulması',
        ],
        accent: 'violet',
      },
      {
        id: 't4',
        period: '2025 —',
        role: 'Teknoloji & Yapay Zekâ Uzmanı',
        org: 'Bağımsız / Danışmanlık',
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
    title: 'Kurumsal işletmeler için çözümler',
    intro:
      'Siber güvenlik, otomasyon, network, sunucu ve web. Kapsam net, çıktı belgeli, devir hazır.',
    items: [
      {
        id: 's1',
        index: '01',
        title: 'Siber Güvenlik Çözümleri',
        summary:
          'Kurumsal ortamın saldırı yüzeyini küçülten, denetlenebilir ve sürdürülebilir güvenlik mimarisi.',
        deliverables: [
          'Kimlik ve erişim (IAM)',
          'Uç nokta ve ağ güvenliği',
          'Sertleştirme ve olay müdahalesi',
        ],
        accent: 'alert',
        engagement: 'Proje / sürekli',
      },
      {
        id: 's2',
        index: '02',
        title: 'Otomasyon & Yapay Zekâ',
        summary:
          'Kurumsal işletmelerde tekrarlayan işleri kaldıran otomasyonlar ve dil modellerinin ölçülebilir iş akışlarına bağlanması.',
        deliverables: [
          'Süreç otomasyonu ve betik kütüphanesi',
          'RAG tabanlı kurum içi asistan',
          'Değerlendirme seti ve maliyet takibi',
        ],
        accent: 'violet',
        engagement: 'Proje bazlı',
      },
      {
        id: 's3',
        index: '03',
        title: 'Network Çözümleri',
        summary:
          'Ağın yeniden tasarlanması, segmentasyonu ve üretime kesintisiz geçişi.',
        deliverables: [
          'Topoloji ve IP planlaması',
          'Segmentasyon ve erişim politikaları',
          'Saha kurulumu ve geçiş planı',
        ],
        accent: 'signal',
        engagement: 'Kısa-orta vadeli',
      },
      {
        id: 's4',
        index: '04',
        title: 'ICT & Sunucu Altyapısı',
        summary:
          'Sunucu platformları, sanallaştırma, yedekleme ve felaket kurtarma; standart ve öngörülebilir ortamlar.',
        deliverables: [
          'Ortam standardizasyonu',
          'Yedekleme ve DR planı',
          'İzleme ve alarm mimarisi',
        ],
        accent: 'phosphor',
        engagement: 'Orta vadeli',
      },
      {
        id: 's5',
        index: '05',
        title: 'Güvenlik Otomasyonu',
        summary:
          'Güvenlik kontrollerinin otomatikleştirilmesi: zafiyet taraması, sertleştirme, erişim gözden geçirmesi ve olay zenginleştirme.',
        deliverables: [
          'Otomatik zafiyet ve uyum kontrolü',
          'Sertleştirme ve politika dağıtımı',
          'Olay zenginleştirme ve raporlama',
        ],
        accent: 'alert',
        engagement: 'Uzman desteği',
      },
      {
        id: 's6',
        index: '06',
        title: 'Web Sitesi & Arayüz',
        summary:
          'Kurumsal siteler ve gerçek zamanlı arayüzler: hızlı, erişilebilir, ölçülebilir ve bakımı kolay.',
        deliverables: [
          'Tasarım sistemi ve bileşenler',
          'Performans ve erişilebilirlik bütçesi',
          'Yayın, izleme ve devir',
        ],
        accent: 'signal',
        engagement: 'Proje bazlı',
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
          'Geçiş, kullanıcı kesintisi olmadan tamamlandı; planlı bakım penceresi ihtiyacı ortadan kalktı ve yeni servisler aynı omurga üzerinde devreye alınabildi.',
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
          'Felaket senaryosu yazılı olarak doğrulandı; geri yükleme süresi ölçülebilir, tatbikatlar tekrarlanabilir hâle geldi.',
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
          'Asistan yalnızca erişimi olan kaynaklardan, alıntıyla yanıt veriyor; her yanıt kaynağına kadar izlenebiliyor.',
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
      'Bir altyapı modernize edilecek, bir süreç otomatikleştirilecek ya da ekibin yetkinliği artırılacaksa yazın. Bağlam, kapsam ve zamanlama yeterli. Mesajınız doğrudan e-posta olarak açılır — kayıt, form, üçüncü taraf servis yok.',
    emailLabel: 'E-posta',
    copyEmail: 'Kopyala',
    copied: 'Kopyalandı',
    instagramLabel: 'Instagram',
    linkedinLabel: 'LinkedIn',
    availability: 'Danışmanlık ve iş birliği için ulaşın',
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
    title: 'Kemal Talha Ekici — Cybersecurity, Automation, ICT',
    description:
      'Cybersecurity, automation and applied AI for enterprises — plus network, server and ICT infrastructure, and web solutions.',
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
    eyebrow: 'Cybersecurity · Automation · ICT',
    lead: 'Cybersecurity, automation and applied AI for enterprises — from network, server and ICT infrastructure through to the web interface.',
    roleLine: 'Cybersecurity · Automation · Applied AI · Network · Servers · Web',
    primaryCta: 'See the work',
    secondaryCta: 'Get in touch',
    scrollHint: 'scroll',
    availability: 'Available for consulting and collaboration',
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
      'Building a system is the easy part; keeping it standing in production, safely, is where the engineering lives. I connect networks, servers, storage and disaster recovery with identity, access and cybersecurity boundaries, then make them sustainable with automation and data pipelines.',
      'I build the reasoning behind every technology choice together with the documentation and the handover plan. A solution passed to a team is not just a running install — it is a system they can understand and build on.',
      'My recent focus is automation for enterprises: wiring language models and data pipelines into real operations. Not a demo that runs, but systems that are auditable, observable and scalable.',
    ],
    pillars: [
      {
        title: 'Infrastructure',
        body: 'Network topology, server platforms, storage and backup. A foundation that runs without interruption and can be observed.',
        accent: 'signal',
      },
      {
        title: 'Systems',
        body: 'Windows and Linux, virtualisation, hybrid cloud, monitoring and written operating procedures.',
        accent: 'phosphor',
      },
      {
        title: 'Intelligence',
        body: 'Automation, data pipelines and language models wired into day-to-day operations, with results you can measure.',
        accent: 'violet',
      },
    ],
    signature: 'Kemal Talha Ekici',
    signatureNote: 'Cybersecurity · Automation · ICT',
  },

  capabilities: {
    kicker: '02 / EXPERTISE',
    title: 'Which layer solves which problem?',
    intro:
      'Eight practice areas, one operating picture. Each area ends in a measurable deliverable; the hand-offs between them never break.',
    hoverHint: 'Hover a card — the scene re-tints',
    items: [
      {
        id: 'network',
        index: '01',
        title: 'Network & Infrastructure',
        description:
          'Layer 2/3 network design, routing and switching, VPN and remote access, structured cabling. Delivered to production through bottleneck analysis and on-site commissioning.',
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
          'Windows Server, Linux, virtualisation, backup strategy and high availability. Environments get standardised, capacity becomes predictable.',
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
          'Identity and access management, endpoint and network security, hardening baselines — built for enterprise environments with incident response and auditable policy.',
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
          'Enterprise automation: scripting, workflow automation, CI/CD and infrastructure as code. Idempotent, version-controlled and reversible.',
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
          'Relational databases, ETL pipelines, API and middleware layers — with data quality and monitoring end to end.',
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
          'Runbook and documentation standards, training and mentoring, incident discipline, processes that survive handover.',
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
          'React, TypeScript and WebGL/Three.js for real-time interfaces. Performance budgets, accessibility and a component model that scales.',
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
      'Four periods of steadily widening scope. Each line is the trace left behind by the systems that were run.',
    items: [
      {
        id: 't1',
        period: '2019 — 2022',
        role: 'ICT Operations & Infrastructure',
        org: 'Corporate IT',
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
        org: 'Corporate IT',
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
        org: 'Corporate IT',
        summary: 'Hybrid cloud, identity, API layers and observability.',
        points: [
          'Unified the hybrid estate with identity and API layers',
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
    title: 'Solutions for enterprise teams',
    intro:
      'Cybersecurity, automation, network, servers and web. Clear scope, documented output, ready to hand over.',
    items: [
      {
        id: 's1',
        index: '01',
        title: 'Cybersecurity Solutions',
        summary:
          'A security architecture that shrinks the attack surface and stays auditable, sustainable operation.',
        deliverables: [
          'Identity and access (IAM)',
          'Endpoint and network security',
          'Hardening and incident response',
        ],
        accent: 'alert',
        engagement: 'Project / ongoing',
      },
      {
        id: 's2',
        index: '02',
        title: 'Automation & Applied AI',
        summary:
          'Automation that removes repetitive work in enterprise teams, and language models wired into measurable workflows.',
        deliverables: [
          'Process automation and script library',
          'RAG-based institutional assistant',
          'Evaluation set and cost tracking',
        ],
        accent: 'violet',
        engagement: 'Project based',
      },
      {
        id: 's3',
        index: '03',
        title: 'Network Solutions',
        summary:
          'Redesign, segment and move the network into production without interruption.',
        deliverables: [
          'Topology and IP addressing plan',
          'Segmentation and access policies',
          'Site installation and cutover plan',
        ],
        accent: 'signal',
        engagement: 'Short to mid-term',
      },
      {
        id: 's4',
        index: '04',
        title: 'ICT & Server Infrastructure',
        summary:
          'Server platforms, virtualisation, backup and disaster recovery — standardised, predictable environments.',
        deliverables: [
          'Environment standardisation',
          'Backup and DR plan',
          'Monitoring and alerting architecture',
        ],
        accent: 'phosphor',
        engagement: 'Mid-term',
      },
      {
        id: 's5',
        index: '05',
        title: 'Security Automation',
        summary:
          'Automating security controls: vulnerability scanning, hardening, access reviews and alert enrichment.',
        deliverables: [
          'Automated vulnerability and compliance checks',
          'Hardening and policy rollout',
          'Alert enrichment and reporting',
        ],
        accent: 'alert',
        engagement: 'Specialist support',
      },
      {
        id: 's6',
        index: '06',
        title: 'Websites & Interfaces',
        summary:
          'Corporate sites and real-time interfaces: fast, accessible, measurable and easy to maintain.',
        deliverables: [
          'Design system and components',
          'Performance and accessibility budget',
          'Launch, monitoring and handover',
        ],
        accent: 'signal',
        engagement: 'Project based',
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
          'The cutover completed with no user interruption; the recurring maintenance window disappeared and new services could ship on the same backbone.',
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
          'The disaster scenario was verified in drills; recovery time became measurable and repeatable.',
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
          'The assistant answers only from sources the requester can access, citing every claim and tracing back to its source.',
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
      'Modernising infrastructure, automating a process, or raising a team’s capability — write to me. Context, scope and timing are enough. Your message opens directly in your email client: no registration, no form service, no third party.',
    emailLabel: 'Email',
    copyEmail: 'Copy',
    copied: 'Copied',
    instagramLabel: 'Instagram',
    linkedinLabel: 'LinkedIn',
    availability: 'Available for consulting and collaboration',
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
