// Ported from the Wasla HTML prototype (single-file React). Kept as JSX for fidelity.
import React, { useState, useEffect, useRef, useMemo } from "react";

// ============ MOCK DATA ============
const mockAdvertisers = [
  {
    id: 'adv01',
    projectName: 'فعاليات حمص',
    projectType: 'فعاليات',
    location: 'حمص — الحميدية',
    addressDetail: 'شارع الحضارة — مقابل حديقة الدبلان',
    phone: '0927091883',
    socialChoice: 'instagram',
    socialUrl: '@فعالياتحمص.homs',
    interests: [
      'فعاليات'
    ],
    campaignsCount: 1,
    avatar: '🎪',
    color: '#FFF7ED',
    desc: 'مشروع مميز في مجال فعاليات يقدم خدمات عالية الجودة لأهالي حمص.'
  },
  {
    id: 'adv02',
    projectName: 'مهرجان حمص الثقافي',
    projectType: 'فعاليات',
    location: 'حمص — الإنشاءات',
    addressDetail: 'شارع الغوطة الرئيسي — جانب سوق الخضار',
    phone: '0931325839',
    socialChoice: 'facebook',
    socialUrl: 'fb.com/مهرجانحم',
    interests: [
      'فعاليات'
    ],
    campaignsCount: 2,
    avatar: '🎪',
    color: '#FDF2F8',
    desc: 'مشروع مميز في مجال فعاليات يقدم خدمات عالية الجودة لأهالي حمص.'
  },
  {
    id: 'adv03',
    projectName: 'تنظيم فعاليات الشام',
    projectType: 'فعاليات',
    location: 'حمص — الغوطة',
    addressDetail: 'شارع الميدان — قرب دوار الساعة',
    phone: '0929176473',
    socialChoice: 'facebook',
    socialUrl: 'fb.com/تنظيمفعا',
    interests: [
      'فعاليات',
      'تقنية'
    ],
    campaignsCount: 3,
    avatar: '🎪',
    color: '#EFF6FF',
    desc: 'مشروع مميز في مجال فعاليات يقدم خدمات عالية الجودة لأهالي حمص.'
  },
  {
    id: 'adv04',
    projectName: 'فعاليات الدبلان',
    projectType: 'فعاليات',
    location: 'حمص — كرم الشامي',
    addressDetail: 'شارع الوعر — مقابل مشفى الكندي',
    phone: '0948500891',
    socialChoice: 'facebook',
    socialUrl: 'fb.com/فعالياتا',
    interests: [
      'فعاليات'
    ],
    campaignsCount: 1,
    avatar: '🎪',
    color: '#FEFCE8',
    desc: 'مشروع مميز في مجال فعاليات يقدم خدمات عالية الجودة لأهالي حمص.'
  },
  {
    id: 'adv05',
    projectName: 'مطعم لحظة',
    projectType: 'مطاعم ومقاهي',
    location: 'حمص — وادي الذهب',
    addressDetail: 'شارع الحميدية — سوق الحميدية القديم',
    phone: '0911169083',
    socialChoice: 'facebook',
    socialUrl: 'fb.com/مطعملحظة',
    interests: [
      'مطاعم'
    ],
    campaignsCount: 1,
    avatar: '🍔',
    color: '#ECFDF5',
    desc: 'مشروع مميز في مجال مطاعم يقدم خدمات عالية الجودة لأهالي حمص.'
  },
  {
    id: 'adv06',
    projectName: 'مطعم الشام',
    projectType: 'مطاعم ومقاهي',
    location: 'حمص — عكرمة',
    addressDetail: 'شارع الإنشاءات — قرب جامعة البعث',
    phone: '0928858386',
    socialChoice: 'instagram',
    socialUrl: '@مطعمالشام.homs',
    interests: [
      'مطاعم',
      'سفر'
    ],
    campaignsCount: 3,
    avatar: '🍔',
    color: '#F5F3FF',
    desc: 'مشروع مميز في مجال مطاعم يقدم خدمات عالية الجودة لأهالي حمص.'
  },
  {
    id: 'adv07',
    projectName: 'مطعم بيت المونة',
    projectType: 'مطاعم ومقاهي',
    location: 'حمص — الوعر',
    addressDetail: 'شارع الكورنيش — مقابل نادي الضباط',
    phone: '0992364207',
    socialChoice: 'none',
    socialUrl: '—',
    interests: [
      'مطاعم',
      'فعاليات'
    ],
    campaignsCount: 2,
    avatar: '🍔',
    color: '#FFF1F2',
    desc: 'مشروع مميز في مجال مطاعم يقدم خدمات عالية الجودة لأهالي حمص.'
  },
  {
    id: 'adv08',
    projectName: 'مطبخ حمص العتيق',
    projectType: 'مطاعم ومقاهي',
    location: 'حمص — بابا عمرو',
    addressDetail: 'شارع بابا عمرو — جانب مسجد خالد',
    phone: '0962211269',
    socialChoice: 'facebook',
    socialUrl: 'fb.com/مطبخحمصا',
    interests: [
      'مطاعم',
      'صحة'
    ],
    campaignsCount: 3,
    avatar: '🍔',
    color: '#F0FDF4',
    desc: 'مشروع مميز في مجال مطاعم يقدم خدمات عالية الجودة لأهالي حمص.'
  },
  {
    id: 'adv09',
    projectName: 'صالون الجمال',
    projectType: 'تجميل',
    location: 'حمص — القصور',
    addressDetail: 'حي القصور — الشارع العام',
    phone: '0955695585',
    socialChoice: 'instagram',
    socialUrl: '@صالونالجما.homs',
    interests: [
      'تجميل'
    ],
    campaignsCount: 3,
    avatar: '💄',
    color: '#FFFBEB',
    desc: 'مشروع مميز في مجال تجميل يقدم خدمات عالية الجودة لأهالي حمص.'
  },
  {
    id: 'adv10',
    projectName: 'مركز لمسة جمال',
    projectType: 'تجميل',
    location: 'حمص — الزهراء',
    addressDetail: 'شارع الزهراء — مقابل مدرسة الشهيد',
    phone: '0990260373',
    socialChoice: 'instagram',
    socialUrl: '@مركزلمسةجم.homs',
    interests: [
      'تجميل',
      'فعاليات'
    ],
    campaignsCount: 2,
    avatar: '💄',
    color: '#F0F9FF',
    desc: 'مشروع مميز في مجال تجميل يقدم خدمات عالية الجودة لأهالي حمص.'
  },
  {
    id: 'adv11',
    projectName: 'صالون أناقة',
    projectType: 'تجميل',
    location: 'حمص — الدبلان',
    addressDetail: 'شارع عكرمة — قرب فرن الآلي',
    phone: '0944135189',
    socialChoice: 'facebook',
    socialUrl: 'fb.com/صالونأنا',
    interests: [
      'تجميل'
    ],
    campaignsCount: 2,
    avatar: '💄',
    color: '#FFF7ED',
    desc: 'مشروع مميز في مجال تجميل يقدم خدمات عالية الجودة لأهالي حمص.'
  },
  {
    id: 'adv12',
    projectName: 'متجر مكياج حمص',
    projectType: 'أزياء وتجميل',
    location: 'حمص — باب السباع',
    addressDetail: 'شارع وادي الذهب — جانب حديقة الطلائع',
    phone: '0933921501',
    socialChoice: 'none',
    socialUrl: '—',
    interests: [
      'مكياج'
    ],
    campaignsCount: 1,
    avatar: '💅',
    color: '#FDF2F8',
    desc: 'مشروع مميز في مجال مكياج يقدم خدمات عالية الجودة لأهالي حمص.'
  },
  {
    id: 'adv13',
    projectName: 'بوتيك المكياج',
    projectType: 'أزياء وتجميل',
    location: 'حمص — الخالدية',
    addressDetail: 'شارع باب السباع — قرب القلعة',
    phone: '0978325780',
    socialChoice: 'facebook',
    socialUrl: 'fb.com/بوتيكالم',
    interests: [
      'مكياج',
      'صحة'
    ],
    campaignsCount: 1,
    avatar: '💅',
    color: '#EFF6FF',
    desc: 'مشروع مميز في مجال مكياج يقدم خدمات عالية الجودة لأهالي حمص.'
  },
  {
    id: 'adv14',
    projectName: 'عالم المكياج',
    projectType: 'أزياء وتجميل',
    location: 'حمص — النزهة',
    addressDetail: 'شارع الخالدية — مقابل السوق المغطى',
    phone: '0911335718',
    socialChoice: 'instagram',
    socialUrl: '@عالمالمكيا.homs',
    interests: [
      'مكياج',
      'مطاعم'
    ],
    campaignsCount: 1,
    avatar: '💅',
    color: '#FEFCE8',
    desc: 'مشروع مميز في مجال مكياج يقدم خدمات عالية الجودة لأهالي حمص.'
  },
  {
    id: 'adv15',
    projectName: 'لمسات مكياج',
    projectType: 'أزياء وتجميل',
    location: 'حمص — الميدان',
    addressDetail: 'شارع النزهة — جانب مقهى الروضة',
    phone: '0929049710',
    socialChoice: 'facebook',
    socialUrl: 'fb.com/لمساتمكي',
    interests: [
      'مكياج',
      'صحة'
    ],
    campaignsCount: 1,
    avatar: '💅',
    color: '#ECFDF5',
    desc: 'مشروع مميز في مجال مكياج يقدم خدمات عالية الجودة لأهالي حمص.'
  },
  {
    id: 'adv16',
    projectName: 'أناقة العروس',
    projectType: 'أزياء وتجميل',
    location: 'حمص — جورة الشياح',
    addressDetail: 'شارع جورة الشياح — قرب البلدية',
    phone: '0976555354',
    socialChoice: 'instagram',
    socialUrl: '@أناقةالعرو.homs',
    interests: [
      'أزياء',
      'عطور'
    ],
    campaignsCount: 1,
    avatar: '👗',
    color: '#F5F3FF',
    desc: 'مشروع مميز في مجال أزياء يقدم خدمات عالية الجودة لأهالي حمص.'
  },
  {
    id: 'adv17',
    projectName: 'متجر الأناقة',
    projectType: 'أزياء وتجميل',
    location: 'حمص — الحميدية',
    addressDetail: 'شارع الحضارة — مقابل حديقة الدبلان',
    phone: '0916748758',
    socialChoice: 'instagram',
    socialUrl: '@متجرالأناق.homs',
    interests: [
      'أزياء'
    ],
    campaignsCount: 1,
    avatar: '👗',
    color: '#FFF1F2',
    desc: 'مشروع مميز في مجال أزياء يقدم خدمات عالية الجودة لأهالي حمص.'
  },
  {
    id: 'adv18',
    projectName: 'أزياء حمص',
    projectType: 'أزياء وتجميل',
    location: 'حمص — الإنشاءات',
    addressDetail: 'شارع الغوطة الرئيسي — جانب سوق الخضار',
    phone: '0926269972',
    socialChoice: 'facebook',
    socialUrl: 'fb.com/أزياءحمص',
    interests: [
      'أزياء'
    ],
    campaignsCount: 3,
    avatar: '👗',
    color: '#F0FDF4',
    desc: 'مشروع مميز في مجال أزياء يقدم خدمات عالية الجودة لأهالي حمص.'
  },
  {
    id: 'adv19',
    projectName: 'تقنية بلس',
    projectType: 'تقنية',
    location: 'حمص — الغوطة',
    addressDetail: 'شارع الميدان — قرب دوار الساعة',
    phone: '0906249230',
    socialChoice: 'facebook',
    socialUrl: 'fb.com/تقنيةبلس',
    interests: [
      'تقنية'
    ],
    campaignsCount: 3,
    avatar: '📱',
    color: '#FFFBEB',
    desc: 'مشروع مميز في مجال تقنية يقدم خدمات عالية الجودة لأهالي حمص.'
  },
  {
    id: 'adv20',
    projectName: 'متجر التقنية',
    projectType: 'تقنية',
    location: 'حمص — كرم الشامي',
    addressDetail: 'شارع الوعر — مقابل مشفى الكندي',
    phone: '0990178081',
    socialChoice: 'none',
    socialUrl: '—',
    interests: [
      'تقنية'
    ],
    campaignsCount: 3,
    avatar: '📱',
    color: '#F0F9FF',
    desc: 'مشروع مميز في مجال تقنية يقدم خدمات عالية الجودة لأهالي حمص.'
  },
  {
    id: 'adv21',
    projectName: 'عالم التقنية',
    projectType: 'تقنية',
    location: 'حمص — وادي الذهب',
    addressDetail: 'شارع الحميدية — سوق الحميدية القديم',
    phone: '0973581106',
    socialChoice: 'instagram',
    socialUrl: '@عالمالتقني.homs',
    interests: [
      'تقنية',
      'عطور'
    ],
    campaignsCount: 2,
    avatar: '📱',
    color: '#FFF7ED',
    desc: 'مشروع مميز في مجال تقنية يقدم خدمات عالية الجودة لأهالي حمص.'
  },
  {
    id: 'adv22',
    projectName: 'إلكترونيات حمص',
    projectType: 'تقنية',
    location: 'حمص — عكرمة',
    addressDetail: 'شارع الإنشاءات — قرب جامعة البعث',
    phone: '0989822691',
    socialChoice: 'none',
    socialUrl: '—',
    interests: [
      'تقنية'
    ],
    campaignsCount: 1,
    avatar: '📱',
    color: '#FDF2F8',
    desc: 'مشروع مميز في مجال تقنية يقدم خدمات عالية الجودة لأهالي حمص.'
  },
  {
    id: 'adv23',
    projectName: 'لياقة برو',
    projectType: 'رياضة ولياقة',
    location: 'حمص — الوعر',
    addressDetail: 'شارع الكورنيش — مقابل نادي الضباط',
    phone: '0921638322',
    socialChoice: 'none',
    socialUrl: '—',
    interests: [
      'رياضة'
    ],
    campaignsCount: 2,
    avatar: '💪',
    color: '#EFF6FF',
    desc: 'مشروع مميز في مجال رياضة يقدم خدمات عالية الجودة لأهالي حمص.'
  },
  {
    id: 'adv24',
    projectName: 'نادي حمص الرياضي',
    projectType: 'رياضة ولياقة',
    location: 'حمص — بابا عمرو',
    addressDetail: 'شارع بابا عمرو — جانب مسجد خالد',
    phone: '0912365309',
    socialChoice: 'facebook',
    socialUrl: 'fb.com/ناديحمصا',
    interests: [
      'رياضة',
      'فعاليات'
    ],
    campaignsCount: 1,
    avatar: '💪',
    color: '#FEFCE8',
    desc: 'مشروع مميز في مجال رياضة يقدم خدمات عالية الجودة لأهالي حمص.'
  },
  {
    id: 'adv25',
    projectName: 'صالة القوة',
    projectType: 'رياضة ولياقة',
    location: 'حمص — القصور',
    addressDetail: 'حي القصور — الشارع العام',
    phone: '0978074630',
    socialChoice: 'instagram',
    socialUrl: '@صالةالقوة.homs',
    interests: [
      'رياضة'
    ],
    campaignsCount: 3,
    avatar: '💪',
    color: '#ECFDF5',
    desc: 'مشروع مميز في مجال رياضة يقدم خدمات عالية الجودة لأهالي حمص.'
  },
  {
    id: 'adv26',
    projectName: 'وكالة سفر حمص',
    projectType: 'سفر وسياحة',
    location: 'حمص — الزهراء',
    addressDetail: 'شارع الزهراء — مقابل مدرسة الشهيد',
    phone: '0987102660',
    socialChoice: 'instagram',
    socialUrl: '@وكالةسفرحم.homs',
    interests: [
      'سفر',
      'مكياج'
    ],
    campaignsCount: 2,
    avatar: '✈️',
    color: '#F5F3FF',
    desc: 'مشروع مميز في مجال سفر يقدم خدمات عالية الجودة لأهالي حمص.'
  },
  {
    id: 'adv27',
    projectName: 'رحلات حمص',
    projectType: 'سفر وسياحة',
    location: 'حمص — الدبلان',
    addressDetail: 'شارع عكرمة — قرب فرن الآلي',
    phone: '0979916788',
    socialChoice: 'instagram',
    socialUrl: '@رحلاتحمص.homs',
    interests: [
      'سفر',
      'مكياج'
    ],
    campaignsCount: 2,
    avatar: '✈️',
    color: '#FFF1F2',
    desc: 'مشروع مميز في مجال سفر يقدم خدمات عالية الجودة لأهالي حمص.'
  },
  {
    id: 'adv28',
    projectName: 'سفر وسياحة حمص',
    projectType: 'سفر وسياحة',
    location: 'حمص — باب السباع',
    addressDetail: 'شارع وادي الذهب — جانب حديقة الطلائع',
    phone: '0967648851',
    socialChoice: 'none',
    socialUrl: '—',
    interests: [
      'سفر',
      'فعاليات'
    ],
    campaignsCount: 2,
    avatar: '✈️',
    color: '#F0FDF4',
    desc: 'مشروع مميز في مجال سفر يقدم خدمات عالية الجودة لأهالي حمص.'
  },
  {
    id: 'adv29',
    projectName: 'مكتب السفر الذهبي',
    projectType: 'سفر وسياحة',
    location: 'حمص — الخالدية',
    addressDetail: 'شارع باب السباع — قرب القلعة',
    phone: '0927195524',
    socialChoice: 'instagram',
    socialUrl: '@مكتبالسفرا.homs',
    interests: [
      'سفر',
      'فعاليات'
    ],
    campaignsCount: 2,
    avatar: '✈️',
    color: '#FFFBEB',
    desc: 'مشروع مميز في مجال سفر يقدم خدمات عالية الجودة لأهالي حمص.'
  },
  {
    id: 'adv30',
    projectName: 'بيت العود',
    projectType: 'عطور وبخور',
    location: 'حمص — النزهة',
    addressDetail: 'شارع الخالدية — مقابل السوق المغطى',
    phone: '0953602174',
    socialChoice: 'facebook',
    socialUrl: 'fb.com/بيتالعود',
    interests: [
      'عطور'
    ],
    campaignsCount: 1,
    avatar: '🌸',
    color: '#F0F9FF',
    desc: 'مشروع مميز في مجال عطور يقدم خدمات عالية الجودة لأهالي حمص.'
  },
  {
    id: 'adv31',
    projectName: 'عطور حمص',
    projectType: 'عطور وبخور',
    location: 'حمص — الميدان',
    addressDetail: 'شارع النزهة — جانب مقهى الروضة',
    phone: '0927390111',
    socialChoice: 'none',
    socialUrl: '—',
    interests: [
      'عطور'
    ],
    campaignsCount: 1,
    avatar: '🌸',
    color: '#FFF7ED',
    desc: 'مشروع مميز في مجال عطور يقدم خدمات عالية الجودة لأهالي حمص.'
  },
  {
    id: 'adv32',
    projectName: 'عبير الشرق',
    projectType: 'عطور وبخور',
    location: 'حمص — جورة الشياح',
    addressDetail: 'شارع جورة الشياح — قرب البلدية',
    phone: '0939022782',
    socialChoice: 'none',
    socialUrl: '—',
    interests: [
      'عطور'
    ],
    campaignsCount: 2,
    avatar: '🌸',
    color: '#FDF2F8',
    desc: 'مشروع مميز في مجال عطور يقدم خدمات عالية الجودة لأهالي حمص.'
  },
  {
    id: 'adv33',
    projectName: 'صيدلية الصحة',
    projectType: 'صحة',
    location: 'حمص — الحميدية',
    addressDetail: 'شارع الحضارة — مقابل حديقة الدبلان',
    phone: '0956434411',
    socialChoice: 'facebook',
    socialUrl: 'fb.com/صيدليةال',
    interests: [
      'صحة'
    ],
    campaignsCount: 2,
    avatar: '🏥',
    color: '#EFF6FF',
    desc: 'مشروع مميز في مجال صحة يقدم خدمات عالية الجودة لأهالي حمص.'
  },
  {
    id: 'adv34',
    projectName: 'مركز الصحة والعافية',
    projectType: 'صحة',
    location: 'حمص — الإنشاءات',
    addressDetail: 'شارع الغوطة الرئيسي — جانب سوق الخضار',
    phone: '0985486530',
    socialChoice: 'instagram',
    socialUrl: '@مركزالصحةو.homs',
    interests: [
      'صحة',
      'سفر'
    ],
    campaignsCount: 1,
    avatar: '🏥',
    color: '#FEFCE8',
    desc: 'مشروع مميز في مجال صحة يقدم خدمات عالية الجودة لأهالي حمص.'
  },
  {
    id: 'adv35',
    projectName: 'عيادة حمص',
    projectType: 'صحة',
    location: 'حمص — الغوطة',
    addressDetail: 'شارع الميدان — قرب دوار الساعة',
    phone: '0911194304',
    socialChoice: 'facebook',
    socialUrl: 'fb.com/عيادةحمص',
    interests: [
      'صحة',
      'فعاليات'
    ],
    campaignsCount: 1,
    avatar: '🏥',
    color: '#ECFDF5',
    desc: 'مشروع مميز في مجال صحة يقدم خدمات عالية الجودة لأهالي حمص.'
  },
  {
    id: 'adv36',
    projectName: 'مخبز الصحة',
    projectType: 'صحة',
    location: 'حمص — كرم الشامي',
    addressDetail: 'شارع الوعر — مقابل مشفى الكندي',
    phone: '0921203849',
    socialChoice: 'instagram',
    socialUrl: '@مخبزالصحة.homs',
    interests: [
      'صحة',
      'مكياج'
    ],
    campaignsCount: 2,
    avatar: '🏥',
    color: '#F5F3FF',
    desc: 'مشروع مميز في مجال صحة يقدم خدمات عالية الجودة لأهالي حمص.'
  }
]

const mockInfluencers = [
  {
    id: 'inf01',
    name: 'سارة القحطاني',
    handle: '@sara.beauty',
    handles: {
      ig: '@sara.beauty',
      fb: ''
    },
    platforms: {
      instagram: true,
      facebook: false
    },
    followers: {
      ig: '27082',
      fb: ''
    },
    followersByPlatform: {
      ig: '27082',
      fb: ''
    },
    interests: [
      'فعاليات',
      'تجميل',
      'تقنية'
    ],
    avatar: 'https://i.pravatar.cc/200?img=5',
    verified: true,
    packages: [
      {
        id: 'p1',
        name: 'باقة الظهور',
        price: 1236,
        reels: 0,
        stories: 2,
        posts: 0,
        notes: 'حفظ 24 ساعة',
        includes: '0 ريلز + 0 بوستات + 2 ستوريات'
      },
      {
        id: 'p2',
        name: 'باقة التفاعل',
        price: 2177,
        reels: 1,
        stories: 3,
        posts: 1,
        notes: '',
        includes: '1 ريلز + 1 بوستات + 3 ستوريات'
      },
      {
        id: 'p3',
        name: 'باقة الانتشار',
        price: 3846,
        reels: 2,
        stories: 4,
        posts: 0,
        notes: '',
        includes: '2 ريلز + 0 بوستات + 4 ستوريات'
      },
      {
        id: 'p4',
        name: 'باقة النجومية',
        price: 6281,
        reels: 0,
        stories: 5,
        posts: 1,
        notes: '',
        includes: '0 ريلز + 1 بوستات + 5 ستوريات'
      }
    ],
    works: [
      'instagram.com/p/work1',
      'instagram.com/p/work2'
    ],
    bio: 'صانعة محتوى تجميل وأزياء — أشارك روتين العناية.'
  },
  {
    id: 'inf02',
    name: 'محمد الحربي',
    handle: '@moh.foodie',
    handles: {
      ig: '@moh.foodie',
      fb: 'fb.com/moh.foodie'
    },
    platforms: {
      instagram: true,
      facebook: true
    },
    followers: {
      ig: '35289',
      fb: '29913'
    },
    followersByPlatform: {
      ig: '35289',
      fb: '29913'
    },
    interests: [
      'مطاعم',
      'مكياج'
    ],
    avatar: 'https://i.pravatar.cc/200?img=15',
    verified: false,
    packages: [
      {
        id: 'p6',
        name: 'باقة الظهور',
        price: 1560,
        reels: 0,
        stories: 2,
        posts: 0,
        notes: 'حفظ 24 ساعة',
        includes: '0 ريلز + 0 بوستات + 2 ستوريات'
      },
      {
        id: 'p7',
        name: 'باقة التفاعل',
        price: 2551,
        reels: 1,
        stories: 3,
        posts: 1,
        notes: '',
        includes: '1 ريلز + 1 بوستات + 3 ستوريات'
      }
    ],
    works: [],
    bio: 'مغامر مطاعم — تقييمات صادقة.'
  },
  {
    id: 'inf03',
    name: 'نورة التقنية',
    handle: '@noura.tech',
    handles: {
      ig: '',
      fb: 'fb.com/noura.tech'
    },
    platforms: {
      instagram: false,
      facebook: true
    },
    followers: {
      ig: '',
      fb: '43905'
    },
    followersByPlatform: {
      ig: '',
      fb: '43905'
    },
    interests: [
      'تجميل',
      'أزياء'
    ],
    avatar: 'https://i.pravatar.cc/200?img=32',
    verified: false,
    packages: [
      {
        id: 'p11',
        name: 'باقة الظهور',
        price: 1663,
        reels: 0,
        stories: 2,
        posts: 0,
        notes: 'حفظ 24 ساعة',
        includes: '0 ريلز + 0 بوستات + 2 ستوريات'
      },
      {
        id: 'p12',
        name: 'باقة التفاعل',
        price: 2610,
        reels: 1,
        stories: 3,
        posts: 1,
        notes: '',
        includes: '1 ريلز + 1 بوستات + 3 ستوريات'
      }
    ],
    works: [
      'instagram.com/p/work3',
      'instagram.com/p/work4'
    ],
    bio: 'أراجع الأجهزة بأسلوب مبسط.'
  },
  {
    id: 'inf04',
    name: 'عبدالله فتنس',
    handle: '@abdu.fit',
    handles: {
      ig: '@abdu.fit',
      fb: ''
    },
    platforms: {
      instagram: true,
      facebook: false
    },
    followers: {
      ig: '70614',
      fb: ''
    },
    followersByPlatform: {
      ig: '70614',
      fb: ''
    },
    interests: [
      'مكياج',
      'تقنية',
      'عطور'
    ],
    avatar: 'https://i.pravatar.cc/200?img=12',
    verified: true,
    packages: [
      {
        id: 'p16',
        name: 'باقة الظهور',
        price: 1942,
        reels: 0,
        stories: 2,
        posts: 0,
        notes: 'حفظ 24 ساعة',
        includes: '0 ريلز + 0 بوستات + 2 ستوريات'
      },
      {
        id: 'p17',
        name: 'باقة التفاعل',
        price: 2903,
        reels: 1,
        stories: 3,
        posts: 1,
        notes: '',
        includes: '1 ريلز + 1 بوستات + 3 ستوريات'
      },
      {
        id: 'p18',
        name: 'باقة الانتشار',
        price: 4598,
        reels: 2,
        stories: 4,
        posts: 0,
        notes: '',
        includes: '2 ريلز + 0 بوستات + 4 ستوريات'
      },
      {
        id: 'p19',
        name: 'باقة النجومية',
        price: 6987,
        reels: 0,
        stories: 5,
        posts: 1,
        notes: '',
        includes: '0 ريلز + 1 بوستات + 5 ستوريات'
      }
    ],
    works: [
      'facebook.com/work3'
    ],
    bio: 'مدرب لياقة — خطوات بسيطة.'
  },
  {
    id: 'inf05',
    name: 'لينا ستايل',
    handle: '@leena.style',
    handles: {
      ig: '@leena.style',
      fb: 'fb.com/leena.style'
    },
    platforms: {
      instagram: true,
      facebook: true
    },
    followers: {
      ig: '88311',
      fb: '66563'
    },
    followersByPlatform: {
      ig: '88311',
      fb: '66563'
    },
    interests: [
      'أزياء',
      'رياضة'
    ],
    avatar: 'https://i.pravatar.cc/200?img=26',
    verified: false,
    packages: [
      {
        id: 'p21',
        name: 'باقة الظهور',
        price: 2099,
        reels: 0,
        stories: 2,
        posts: 0,
        notes: 'حفظ 24 ساعة',
        includes: '0 ريلز + 0 بوستات + 2 ستوريات'
      },
      {
        id: 'p22',
        name: 'باقة التفاعل',
        price: 3136,
        reels: 1,
        stories: 3,
        posts: 1,
        notes: '',
        includes: '1 ريلز + 1 بوستات + 3 ستوريات'
      },
      {
        id: 'p23',
        name: 'باقة الانتشار',
        price: 4681,
        reels: 2,
        stories: 4,
        posts: 0,
        notes: '',
        includes: '2 ريلز + 0 بوستات + 4 ستوريات'
      },
      {
        id: 'p24',
        name: 'باقة النجومية',
        price: 7014,
        reels: 0,
        stories: 5,
        posts: 1,
        notes: '',
        includes: '0 ريلز + 1 بوستات + 5 ستوريات'
      }
    ],
    works: [
      'instagram.com/p/work5',
      'instagram.com/p/work6'
    ],
    bio: 'أشارك تنسيقات يومية.'
  },
  {
    id: 'inf06',
    name: 'أحمد جيمز',
    handle: '@ahmad.gamer',
    handles: {
      ig: '',
      fb: 'fb.com/ahmad.gamer'
    },
    platforms: {
      instagram: false,
      facebook: true
    },
    followers: {
      ig: '',
      fb: '79811'
    },
    followersByPlatform: {
      ig: '',
      fb: '79811'
    },
    interests: [
      'تقنية',
      'سفر'
    ],
    avatar: 'https://i.pravatar.cc/200?img=8',
    verified: false,
    packages: [
      {
        id: 'p26',
        name: 'باقة الظهور',
        price: 2288,
        reels: 0,
        stories: 2,
        posts: 0,
        notes: 'حفظ 24 ساعة',
        includes: '0 ريلز + 0 بوستات + 2 ستوريات'
      },
      {
        id: 'p27',
        name: 'باقة التفاعل',
        price: 3174,
        reels: 1,
        stories: 3,
        posts: 1,
        notes: '',
        includes: '1 ريلز + 1 بوستات + 3 ستوريات'
      },
      {
        id: 'p28',
        name: 'باقة الانتشار',
        price: 4934,
        reels: 2,
        stories: 4,
        posts: 0,
        notes: '',
        includes: '2 ريلز + 0 بوستات + 4 ستوريات'
      }
    ],
    works: [],
    bio: 'أستعرض الألعاب — بث مباشر.'
  },
  {
    id: 'inf07',
    name: 'ريم العلي',
    handle: '@reem.ali',
    handles: {
      ig: '@reem.ali',
      fb: ''
    },
    platforms: {
      instagram: true,
      facebook: false
    },
    followers: {
      ig: '118905',
      fb: ''
    },
    followersByPlatform: {
      ig: '118905',
      fb: ''
    },
    interests: [
      'رياضة',
      'عطور',
      'مطاعم'
    ],
    avatar: 'https://i.pravatar.cc/200?img=9',
    verified: true,
    packages: [
      {
        id: 'p31',
        name: 'باقة الظهور',
        price: 2518,
        reels: 0,
        stories: 2,
        posts: 0,
        notes: 'حفظ 24 ساعة',
        includes: '0 ريلز + 0 بوستات + 2 ستوريات'
      },
      {
        id: 'p32',
        name: 'باقة التفاعل',
        price: 3483,
        reels: 1,
        stories: 3,
        posts: 1,
        notes: '',
        includes: '1 ريلز + 1 بوستات + 3 ستوريات'
      },
      {
        id: 'p33',
        name: 'باقة الانتشار',
        price: 5222,
        reels: 2,
        stories: 4,
        posts: 0,
        notes: '',
        includes: '2 ريلز + 0 بوستات + 4 ستوريات'
      }
    ],
    works: [
      'instagram.com/p/work7',
      'instagram.com/p/work8'
    ],
    bio: 'خبيرة فعاليات — تغطيات مهرجانات.'
  },
  {
    id: 'inf08',
    name: 'خالد منصور',
    handle: '@khaled.mans',
    handles: {
      ig: '@khaled.mans',
      fb: 'fb.com/khaled.mans'
    },
    platforms: {
      instagram: true,
      facebook: true
    },
    followers: {
      ig: '126291',
      fb: '102773'
    },
    followersByPlatform: {
      ig: '126291',
      fb: '102773'
    },
    interests: [
      'سفر',
      'صحة'
    ],
    avatar: 'https://i.pravatar.cc/200?img=18',
    verified: false,
    packages: [
      {
        id: 'p36',
        name: 'باقة الظهور',
        price: 2674,
        reels: 0,
        stories: 2,
        posts: 0,
        notes: 'حفظ 24 ساعة',
        includes: '0 ريلز + 0 بوستات + 2 ستوريات'
      },
      {
        id: 'p37',
        name: 'باقة التفاعل',
        price: 3507,
        reels: 1,
        stories: 3,
        posts: 1,
        notes: '',
        includes: '1 ريلز + 1 بوستات + 3 ستوريات'
      }
    ],
    works: [],
    bio: 'مصور فعاليات حمص.'
  },
  {
    id: 'inf09',
    name: 'نور الهدى',
    handle: '@nour.huda',
    handles: {
      ig: '',
      fb: 'fb.com/nour.huda'
    },
    platforms: {
      instagram: false,
      facebook: true
    },
    followers: {
      ig: '',
      fb: '116996'
    },
    followersByPlatform: {
      ig: '',
      fb: '116996'
    },
    interests: [
      'عطور',
      'فعاليات'
    ],
    avatar: 'https://i.pravatar.cc/200?img=48',
    verified: false,
    packages: [
      {
        id: 'p41',
        name: 'باقة الظهور',
        price: 3035,
        reels: 0,
        stories: 2,
        posts: 0,
        notes: 'حفظ 24 ساعة',
        includes: '0 ريلز + 0 بوستات + 2 ستوريات'
      },
      {
        id: 'p42',
        name: 'باقة التفاعل',
        price: 3937,
        reels: 1,
        stories: 3,
        posts: 1,
        notes: '',
        includes: '1 ريلز + 1 بوستات + 3 ستوريات'
      },
      {
        id: 'p43',
        name: 'باقة الانتشار',
        price: 5538,
        reels: 2,
        stories: 4,
        posts: 0,
        notes: '',
        includes: '2 ريلز + 0 بوستات + 4 ستوريات'
      },
      {
        id: 'p44',
        name: 'باقة النجومية',
        price: 8015,
        reels: 0,
        stories: 5,
        posts: 1,
        notes: '',
        includes: '0 ريلز + 1 بوستات + 5 ستوريات'
      },
      {
        id: 'p45',
        name: 'باقة الانطلاقة',
        price: 11144,
        reels: 1,
        stories: 6,
        posts: 0,
        notes: '',
        includes: '1 ريلز + 0 بوستات + 6 ستوريات'
      }
    ],
    works: [
      'instagram.com/p/work9',
      'instagram.com/p/work10'
    ],
    bio: 'صانعة محتوى صحة وتغذية.'
  },
  {
    id: 'inf10',
    name: 'سامر حداد',
    handle: '@samer.haddad',
    handles: {
      ig: '@samer.haddad',
      fb: ''
    },
    platforms: {
      instagram: true,
      facebook: false
    },
    followers: {
      ig: '160414',
      fb: ''
    },
    followersByPlatform: {
      ig: '160414',
      fb: ''
    },
    interests: [
      'صحة',
      'مطاعم',
      'أزياء'
    ],
    avatar: 'https://i.pravatar.cc/200?img=22',
    verified: true,
    packages: [
      {
        id: 'p46',
        name: 'باقة الظهور',
        price: 3035,
        reels: 0,
        stories: 2,
        posts: 0,
        notes: 'حفظ 24 ساعة',
        includes: '0 ريلز + 0 بوستات + 2 ستوريات'
      },
      {
        id: 'p47',
        name: 'باقة التفاعل',
        price: 3947,
        reels: 1,
        stories: 3,
        posts: 1,
        notes: '',
        includes: '1 ريلز + 1 بوستات + 3 ستوريات'
      },
      {
        id: 'p48',
        name: 'باقة الانتشار',
        price: 5571,
        reels: 2,
        stories: 4,
        posts: 0,
        notes: '',
        includes: '2 ريلز + 0 بوستات + 4 ستوريات'
      },
      {
        id: 'p49',
        name: 'باقة النجومية',
        price: 7946,
        reels: 0,
        stories: 5,
        posts: 1,
        notes: '',
        includes: '0 ريلز + 1 بوستات + 5 ستوريات'
      },
      {
        id: 'p50',
        name: 'باقة الانطلاقة',
        price: 10943,
        reels: 1,
        stories: 6,
        posts: 0,
        notes: '',
        includes: '1 ريلز + 0 بوستات + 6 ستوريات'
      }
    ],
    works: [
      'facebook.com/work9'
    ],
    bio: 'مرشد سياحي — رحلات داخل حمص.'
  },
  {
    id: 'inf11',
    name: 'جنى حمصية',
    handle: '@jana.homs',
    handles: {
      ig: '@jana.homs',
      fb: 'fb.com/jana.homs'
    },
    platforms: {
      instagram: true,
      facebook: true
    },
    followers: {
      ig: '170267',
      fb: '142352'
    },
    followersByPlatform: {
      ig: '170267',
      fb: '142352'
    },
    interests: [
      'فعاليات',
      'تجميل'
    ],
    avatar: 'https://i.pravatar.cc/200?img=33',
    verified: false,
    packages: [
      {
        id: 'p51',
        name: 'باقة الظهور',
        price: 3319,
        reels: 0,
        stories: 2,
        posts: 0,
        notes: 'حفظ 24 ساعة',
        includes: '0 ريلز + 0 بوستات + 2 ستوريات'
      },
      {
        id: 'p52',
        name: 'باقة التفاعل',
        price: 4145,
        reels: 1,
        stories: 3,
        posts: 1,
        notes: '',
        includes: '1 ريلز + 1 بوستات + 3 ستوريات'
      }
    ],
    works: [
      'instagram.com/p/work11',
      'instagram.com/p/work12'
    ],
    bio: 'صانعة محتوى عطور وجمال.'
  }
]

const initialCampaigns = [
  {
    id: 'c01',
    advertiserId: 'adv01',
    advertiserName: 'فعاليات حمص',
    title: 'تغطية مهرجان حمص الثقافي',
    reels: 0,
    stories: 2,
    posts: 2,
    budget: 1000,
    duration: 'شهر',
    goal: 'زيادة المتابعين',
    status: 'active',
    createdAt: '2026-09-12',
    invites: [],
    category: 'فعاليات',
    desc: 'حملة تغطية مهرجان حمص الثقافي — مشروع مميز في مجال فعاليات يقدم خدمات عالية الجودة لأهالي حمص. تستهدف زيادة المتابعين خلال شهر.',
    address: 'حمص — الحميدية',
    addressDetail: 'شارع الحضارة — مقابل حديقة الدبلان'
  },
  {
    id: 'c02',
    advertiserId: 'adv02',
    advertiserName: 'مهرجان حمص الثقافي',
    title: 'تغطية مهرجان حمص الثقافي',
    reels: 3,
    stories: 1,
    posts: 0,
    budget: 2500,
    duration: 'هذا الأسبوع',
    goal: 'زيادة المبيعات',
    status: 'active',
    createdAt: '2026-09-16',
    invites: [],
    category: 'فعاليات',
    desc: 'حملة تغطية مهرجان حمص الثقافي — مشروع مميز في مجال فعاليات يقدم خدمات عالية الجودة لأهالي حمص. تستهدف زيادة المبيعات خلال هذا الأسبوع.',
    address: 'حمص — الإنشاءات',
    addressDetail: 'شارع الغوطة الرئيسي — جانب سوق الخضار'
  },
  {
    id: 'c03',
    advertiserId: 'adv02',
    advertiserName: 'مهرجان حمص الثقافي',
    title: 'فعالية افتتاح سوق الدبلان',
    reels: 1,
    stories: 4,
    posts: 2,
    budget: 1500,
    duration: 'هذا الأسبوع',
    goal: 'زيادة المتابعين',
    status: 'completed',
    createdAt: '2026-09-16',
    invites: [],
    category: 'فعاليات',
    desc: 'حملة فعالية افتتاح سوق الدبلان — مشروع مميز في مجال فعاليات يقدم خدمات عالية الجودة لأهالي حمص. تستهدف زيادة المتابعين خلال هذا الأسبوع.',
    address: 'حمص — الإنشاءات',
    addressDetail: 'شارع الغوطة الرئيسي — جانب سوق الخضار'
  },
  {
    id: 'c04',
    advertiserId: 'adv03',
    advertiserName: 'تنظيم فعاليات الشام',
    title: 'تغطية مهرجان حمص الثقافي',
    reels: 2,
    stories: 4,
    posts: 1,
    budget: 4500,
    duration: 'أسبوعان',
    goal: 'زيادة المتابعين',
    status: 'active',
    createdAt: '2026-09-18',
    invites: [],
    category: 'فعاليات',
    desc: 'حملة تغطية مهرجان حمص الثقافي — مشروع مميز في مجال فعاليات يقدم خدمات عالية الجودة لأهالي حمص. تستهدف زيادة المتابعين خلال أسبوعان.',
    address: 'حمص — الغوطة',
    addressDetail: 'شارع الميدان — قرب دوار الساعة'
  },
  {
    id: 'c05',
    advertiserId: 'adv03',
    advertiserName: 'تنظيم فعاليات الشام',
    title: 'فعالية افتتاح سوق الدبلان',
    reels: 1,
    stories: 4,
    posts: 2,
    budget: 4000,
    duration: 'أسبوعان',
    goal: 'زيادة المتابعين',
    status: 'cancelled',
    createdAt: '2026-09-23',
    invites: [],
    category: 'فعاليات',
    desc: 'حملة فعالية افتتاح سوق الدبلان — مشروع مميز في مجال فعاليات يقدم خدمات عالية الجودة لأهالي حمص. تستهدف زيادة المتابعين خلال أسبوعان.',
    address: 'حمص — الغوطة',
    addressDetail: 'شارع الميدان — قرب دوار الساعة'
  },
  {
    id: 'c06',
    advertiserId: 'adv03',
    advertiserName: 'تنظيم فعاليات الشام',
    title: 'تغطية ليالي حمص الرمضانية',
    reels: 3,
    stories: 5,
    posts: 0,
    budget: 1500,
    duration: 'هذا الأسبوع',
    goal: 'زيادة المتابعين',
    status: 'in_progress',
    createdAt: '2026-09-23',
    invites: [],
    category: 'فعاليات',
    desc: 'حملة تغطية ليالي حمص الرمضانية — مشروع مميز في مجال فعاليات يقدم خدمات عالية الجودة لأهالي حمص. تستهدف زيادة المتابعين خلال هذا الأسبوع.',
    address: 'حمص — الغوطة',
    addressDetail: 'شارع الميدان — قرب دوار الساعة'
  },
  {
    id: 'c07',
    advertiserId: 'adv04',
    advertiserName: 'فعاليات الدبلان',
    title: 'تغطية مهرجان حمص الثقافي',
    reels: 2,
    stories: 1,
    posts: 0,
    budget: 2000,
    duration: 'شهر',
    goal: 'زيادة المبيعات',
    status: 'active',
    createdAt: '2026-09-25',
    invites: [],
    category: 'فعاليات',
    desc: 'حملة تغطية مهرجان حمص الثقافي — مشروع مميز في مجال فعاليات يقدم خدمات عالية الجودة لأهالي حمص. تستهدف زيادة المبيعات خلال شهر.',
    address: 'حمص — كرم الشامي',
    addressDetail: 'شارع الوعر — مقابل مشفى الكندي'
  },
  {
    id: 'c08',
    advertiserId: 'adv05',
    advertiserName: 'مطعم لحظة',
    title: 'إطلاق منيو الصيف الجديد',
    reels: 3,
    stories: 6,
    posts: 1,
    budget: 2500,
    duration: 'أسبوعان',
    goal: 'زيادة المتابعين',
    status: 'active',
    createdAt: '2026-09-29',
    invites: [],
    category: 'مطاعم',
    desc: 'حملة إطلاق منيو الصيف الجديد — مشروع مميز في مجال مطاعم يقدم خدمات عالية الجودة لأهالي حمص. تستهدف زيادة المتابعين خلال أسبوعان.',
    address: 'حمص — وادي الذهب',
    addressDetail: 'شارع الحميدية — سوق الحميدية القديم'
  },
  {
    id: 'c09',
    advertiserId: 'adv06',
    advertiserName: 'مطعم الشام',
    title: 'إطلاق منيو الصيف الجديد',
    reels: 0,
    stories: 5,
    posts: 1,
    budget: 1000,
    duration: 'أسبوعان',
    goal: 'زيادة المتابعين',
    status: 'active',
    createdAt: '2026-09-30',
    invites: [],
    category: 'مطاعم',
    desc: 'حملة إطلاق منيو الصيف الجديد — مشروع مميز في مجال مطاعم يقدم خدمات عالية الجودة لأهالي حمص. تستهدف زيادة المتابعين خلال أسبوعان.',
    address: 'حمص — عكرمة',
    addressDetail: 'شارع الإنشاءات — قرب جامعة البعث'
  },
  {
    id: 'c10',
    advertiserId: 'adv06',
    advertiserName: 'مطعم الشام',
    title: 'تغطية عرض العائلة الأسبوعي',
    reels: 2,
    stories: 3,
    posts: 0,
    budget: 2000,
    duration: 'هذا الأسبوع',
    goal: 'زيادة المبيعات',
    status: 'in_progress',
    createdAt: '2026-10-01',
    invites: [],
    category: 'مطاعم',
    desc: 'حملة تغطية عرض العائلة الأسبوعي — مشروع مميز في مجال مطاعم يقدم خدمات عالية الجودة لأهالي حمص. تستهدف زيادة المبيعات خلال هذا الأسبوع.',
    address: 'حمص — عكرمة',
    addressDetail: 'شارع الإنشاءات — قرب جامعة البعث'
  },
  {
    id: 'c11',
    advertiserId: 'adv06',
    advertiserName: 'مطعم الشام',
    title: 'حملة تذوق أطباق حمص العتيقة',
    reels: 3,
    stories: 2,
    posts: 1,
    budget: 1500,
    duration: 'أسبوعان',
    goal: 'الوعي بالعلامة',
    status: 'cancelled',
    createdAt: '2026-10-04',
    invites: [],
    category: 'مطاعم',
    desc: 'حملة حملة تذوق أطباق حمص العتيقة — مشروع مميز في مجال مطاعم يقدم خدمات عالية الجودة لأهالي حمص. تستهدف الوعي بالعلامة خلال أسبوعان.',
    address: 'حمص — عكرمة',
    addressDetail: 'شارع الإنشاءات — قرب جامعة البعث'
  },
  {
    id: 'c12',
    advertiserId: 'adv07',
    advertiserName: 'مطعم بيت المونة',
    title: 'إطلاق منيو الصيف الجديد',
    reels: 2,
    stories: 2,
    posts: 1,
    budget: 2500,
    duration: 'هذا الأسبوع',
    goal: 'زيادة المتابعين',
    status: 'active',
    createdAt: '2026-10-07',
    invites: [],
    category: 'مطاعم',
    desc: 'حملة إطلاق منيو الصيف الجديد — مشروع مميز في مجال مطاعم يقدم خدمات عالية الجودة لأهالي حمص. تستهدف زيادة المتابعين خلال هذا الأسبوع.',
    address: 'حمص — الوعر',
    addressDetail: 'شارع الكورنيش — مقابل نادي الضباط'
  },
  {
    id: 'c13',
    advertiserId: 'adv07',
    advertiserName: 'مطعم بيت المونة',
    title: 'تغطية عرض العائلة الأسبوعي',
    reels: 1,
    stories: 2,
    posts: 2,
    budget: 2500,
    duration: 'شهر',
    goal: 'زيادة المتابعين',
    status: 'completed',
    createdAt: '2026-10-08',
    invites: [],
    category: 'مطاعم',
    desc: 'حملة تغطية عرض العائلة الأسبوعي — مشروع مميز في مجال مطاعم يقدم خدمات عالية الجودة لأهالي حمص. تستهدف زيادة المتابعين خلال شهر.',
    address: 'حمص — الوعر',
    addressDetail: 'شارع الكورنيش — مقابل نادي الضباط'
  },
  {
    id: 'c14',
    advertiserId: 'adv08',
    advertiserName: 'مطبخ حمص العتيق',
    title: 'إطلاق منيو الصيف الجديد',
    reels: 0,
    stories: 5,
    posts: 1,
    budget: 4000,
    duration: 'هذا الأسبوع',
    goal: 'زيادة المتابعين',
    status: 'active',
    createdAt: '2026-10-09',
    invites: [],
    category: 'مطاعم',
    desc: 'حملة إطلاق منيو الصيف الجديد — مشروع مميز في مجال مطاعم يقدم خدمات عالية الجودة لأهالي حمص. تستهدف زيادة المتابعين خلال هذا الأسبوع.',
    address: 'حمص — بابا عمرو',
    addressDetail: 'شارع بابا عمرو — جانب مسجد خالد'
  },
  {
    id: 'c15',
    advertiserId: 'adv08',
    advertiserName: 'مطبخ حمص العتيق',
    title: 'تغطية عرض العائلة الأسبوعي',
    reels: 0,
    stories: 6,
    posts: 1,
    budget: 4000,
    duration: 'أسبوعان',
    goal: 'الوعي بالعلامة',
    status: 'active',
    createdAt: '2026-10-12',
    invites: [],
    category: 'مطاعم',
    desc: 'حملة تغطية عرض العائلة الأسبوعي — مشروع مميز في مجال مطاعم يقدم خدمات عالية الجودة لأهالي حمص. تستهدف الوعي بالعلامة خلال أسبوعان.',
    address: 'حمص — بابا عمرو',
    addressDetail: 'شارع بابا عمرو — جانب مسجد خالد'
  },
  {
    id: 'c16',
    advertiserId: 'adv08',
    advertiserName: 'مطبخ حمص العتيق',
    title: 'حملة تذوق أطباق حمص العتيقة',
    reels: 3,
    stories: 5,
    posts: 2,
    budget: 3500,
    duration: 'شهر',
    goal: 'زيادة المتابعين',
    status: 'active',
    createdAt: '2026-10-15',
    invites: [],
    category: 'مطاعم',
    desc: 'حملة حملة تذوق أطباق حمص العتيقة — مشروع مميز في مجال مطاعم يقدم خدمات عالية الجودة لأهالي حمص. تستهدف زيادة المتابعين خلال شهر.',
    address: 'حمص — بابا عمرو',
    addressDetail: 'شارع بابا عمرو — جانب مسجد خالد'
  },
  {
    id: 'c17',
    advertiserId: 'adv09',
    advertiserName: 'صالون الجمال',
    title: 'حملة عروض العناية الصيفية',
    reels: 3,
    stories: 5,
    posts: 2,
    budget: 3000,
    duration: 'هذا الأسبوع',
    goal: 'زيادة المتابعين',
    status: 'active',
    createdAt: '2026-10-16',
    invites: [],
    category: 'تجميل',
    desc: 'حملة حملة عروض العناية الصيفية — مشروع مميز في مجال تجميل يقدم خدمات عالية الجودة لأهالي حمص. تستهدف زيادة المتابعين خلال هذا الأسبوع.',
    address: 'حمص — القصور',
    addressDetail: 'حي القصور — الشارع العام'
  },
  {
    id: 'c18',
    advertiserId: 'adv09',
    advertiserName: 'صالون الجمال',
    title: 'تغطية افتتاح قسم التجميل',
    reels: 3,
    stories: 1,
    posts: 1,
    budget: 3000,
    duration: 'هذا الأسبوع',
    goal: 'زيادة المبيعات',
    status: 'in_progress',
    createdAt: '2026-10-19',
    invites: [],
    category: 'تجميل',
    desc: 'حملة تغطية افتتاح قسم التجميل — مشروع مميز في مجال تجميل يقدم خدمات عالية الجودة لأهالي حمص. تستهدف زيادة المبيعات خلال هذا الأسبوع.',
    address: 'حمص — القصور',
    addressDetail: 'حي القصور — الشارع العام'
  },
  {
    id: 'c19',
    advertiserId: 'adv09',
    advertiserName: 'صالون الجمال',
    title: 'حملة تجميل العروس 2026',
    reels: 2,
    stories: 6,
    posts: 0,
    budget: 1000,
    duration: 'شهر',
    goal: 'الوعي بالعلامة',
    status: 'in_progress',
    createdAt: '2026-10-19',
    invites: [],
    category: 'تجميل',
    desc: 'حملة حملة تجميل العروس 2026 — مشروع مميز في مجال تجميل يقدم خدمات عالية الجودة لأهالي حمص. تستهدف الوعي بالعلامة خلال شهر.',
    address: 'حمص — القصور',
    addressDetail: 'حي القصور — الشارع العام'
  },
  {
    id: 'c20',
    advertiserId: 'adv10',
    advertiserName: 'مركز لمسة جمال',
    title: 'حملة عروض العناية الصيفية',
    reels: 1,
    stories: 2,
    posts: 0,
    budget: 3500,
    duration: 'هذا الأسبوع',
    goal: 'الوعي بالعلامة',
    status: 'active',
    createdAt: '2026-10-24',
    invites: [],
    category: 'تجميل',
    desc: 'حملة حملة عروض العناية الصيفية — مشروع مميز في مجال تجميل يقدم خدمات عالية الجودة لأهالي حمص. تستهدف الوعي بالعلامة خلال هذا الأسبوع.',
    address: 'حمص — الزهراء',
    addressDetail: 'شارع الزهراء — مقابل مدرسة الشهيد'
  },
  {
    id: 'c21',
    advertiserId: 'adv10',
    advertiserName: 'مركز لمسة جمال',
    title: 'تغطية افتتاح قسم التجميل',
    reels: 1,
    stories: 6,
    posts: 2,
    budget: 4000,
    duration: 'هذا الأسبوع',
    goal: 'زيادة المتابعين',
    status: 'active',
    createdAt: '2026-10-26',
    invites: [],
    category: 'تجميل',
    desc: 'حملة تغطية افتتاح قسم التجميل — مشروع مميز في مجال تجميل يقدم خدمات عالية الجودة لأهالي حمص. تستهدف زيادة المتابعين خلال هذا الأسبوع.',
    address: 'حمص — الزهراء',
    addressDetail: 'شارع الزهراء — مقابل مدرسة الشهيد'
  },
  {
    id: 'c22',
    advertiserId: 'adv11',
    advertiserName: 'صالون أناقة',
    title: 'حملة عروض العناية الصيفية',
    reels: 2,
    stories: 3,
    posts: 1,
    budget: 4500,
    duration: 'أسبوعان',
    goal: 'زيادة المبيعات',
    status: 'active',
    createdAt: '2026-10-26',
    invites: [],
    category: 'تجميل',
    desc: 'حملة حملة عروض العناية الصيفية — مشروع مميز في مجال تجميل يقدم خدمات عالية الجودة لأهالي حمص. تستهدف زيادة المبيعات خلال أسبوعان.',
    address: 'حمص — الدبلان',
    addressDetail: 'شارع عكرمة — قرب فرن الآلي'
  },
  {
    id: 'c23',
    advertiserId: 'adv11',
    advertiserName: 'صالون أناقة',
    title: 'تغطية افتتاح قسم التجميل',
    reels: 0,
    stories: 6,
    posts: 0,
    budget: 2500,
    duration: 'هذا الأسبوع',
    goal: 'زيادة المبيعات',
    status: 'completed',
    createdAt: '2026-10-26',
    invites: [],
    category: 'تجميل',
    desc: 'حملة تغطية افتتاح قسم التجميل — مشروع مميز في مجال تجميل يقدم خدمات عالية الجودة لأهالي حمص. تستهدف زيادة المبيعات خلال هذا الأسبوع.',
    address: 'حمص — الدبلان',
    addressDetail: 'شارع عكرمة — قرب فرن الآلي'
  },
  {
    id: 'c24',
    advertiserId: 'adv12',
    advertiserName: 'متجر مكياج حمص',
    title: 'إطلاق مجموعة مكياج العيد',
    reels: 3,
    stories: 3,
    posts: 2,
    budget: 2500,
    duration: 'هذا الأسبوع',
    goal: 'زيادة المتابعين',
    status: 'active',
    createdAt: '2026-10-30',
    invites: [],
    category: 'مكياج',
    desc: 'حملة إطلاق مجموعة مكياج العيد — مشروع مميز في مجال مكياج يقدم خدمات عالية الجودة لأهالي حمص. تستهدف زيادة المتابعين خلال هذا الأسبوع.',
    address: 'حمص — باب السباع',
    addressDetail: 'شارع وادي الذهب — جانب حديقة الطلائع'
  },
  {
    id: 'c25',
    advertiserId: 'adv13',
    advertiserName: 'بوتيك المكياج',
    title: 'إطلاق مجموعة مكياج العيد',
    reels: 2,
    stories: 5,
    posts: 2,
    budget: 3000,
    duration: 'هذا الأسبوع',
    goal: 'زيادة المتابعين',
    status: 'active',
    createdAt: '2026-11-02',
    invites: [],
    category: 'مكياج',
    desc: 'حملة إطلاق مجموعة مكياج العيد — مشروع مميز في مجال مكياج يقدم خدمات عالية الجودة لأهالي حمص. تستهدف زيادة المتابعين خلال هذا الأسبوع.',
    address: 'حمص — الخالدية',
    addressDetail: 'شارع باب السباع — قرب القلعة'
  },
  {
    id: 'c26',
    advertiserId: 'adv14',
    advertiserName: 'عالم المكياج',
    title: 'إطلاق مجموعة مكياج العيد',
    reels: 3,
    stories: 5,
    posts: 0,
    budget: 1500,
    duration: 'شهر',
    goal: 'الوعي بالعلامة',
    status: 'active',
    createdAt: '2026-11-03',
    invites: [],
    category: 'مكياج',
    desc: 'حملة إطلاق مجموعة مكياج العيد — مشروع مميز في مجال مكياج يقدم خدمات عالية الجودة لأهالي حمص. تستهدف الوعي بالعلامة خلال شهر.',
    address: 'حمص — النزهة',
    addressDetail: 'شارع الخالدية — مقابل السوق المغطى'
  },
  {
    id: 'c27',
    advertiserId: 'adv15',
    advertiserName: 'لمسات مكياج',
    title: 'إطلاق مجموعة مكياج العيد',
    reels: 1,
    stories: 2,
    posts: 2,
    budget: 1000,
    duration: 'شهر',
    goal: 'زيادة المبيعات',
    status: 'active',
    createdAt: '2026-11-05',
    invites: [],
    category: 'مكياج',
    desc: 'حملة إطلاق مجموعة مكياج العيد — مشروع مميز في مجال مكياج يقدم خدمات عالية الجودة لأهالي حمص. تستهدف زيادة المبيعات خلال شهر.',
    address: 'حمص — الميدان',
    addressDetail: 'شارع النزهة — جانب مقهى الروضة'
  },
  {
    id: 'c28',
    advertiserId: 'adv16',
    advertiserName: 'أناقة العروس',
    title: 'تغطية تشكيلة فساتين 2026',
    reels: 1,
    stories: 2,
    posts: 2,
    budget: 3500,
    duration: 'شهر',
    goal: 'زيادة المتابعين',
    status: 'active',
    createdAt: '2026-11-06',
    invites: [],
    category: 'أزياء',
    desc: 'حملة تغطية تشكيلة فساتين 2026 — مشروع مميز في مجال أزياء يقدم خدمات عالية الجودة لأهالي حمص. تستهدف زيادة المتابعين خلال شهر.',
    address: 'حمص — جورة الشياح',
    addressDetail: 'شارع جورة الشياح — قرب البلدية'
  },
  {
    id: 'c29',
    advertiserId: 'adv17',
    advertiserName: 'متجر الأناقة',
    title: 'تغطية تشكيلة فساتين 2026',
    reels: 1,
    stories: 5,
    posts: 1,
    budget: 1500,
    duration: 'هذا الأسبوع',
    goal: 'زيادة المتابعين',
    status: 'active',
    createdAt: '2026-11-07',
    invites: [],
    category: 'أزياء',
    desc: 'حملة تغطية تشكيلة فساتين 2026 — مشروع مميز في مجال أزياء يقدم خدمات عالية الجودة لأهالي حمص. تستهدف زيادة المتابعين خلال هذا الأسبوع.',
    address: 'حمص — الحميدية',
    addressDetail: 'شارع الحضارة — مقابل حديقة الدبلان'
  },
  {
    id: 'c30',
    advertiserId: 'adv18',
    advertiserName: 'أزياء حمص',
    title: 'تغطية تشكيلة فساتين 2026',
    reels: 0,
    stories: 1,
    posts: 2,
    budget: 3000,
    duration: 'هذا الأسبوع',
    goal: 'الوعي بالعلامة',
    status: 'active',
    createdAt: '2026-11-09',
    invites: [],
    category: 'أزياء',
    desc: 'حملة تغطية تشكيلة فساتين 2026 — مشروع مميز في مجال أزياء يقدم خدمات عالية الجودة لأهالي حمص. تستهدف الوعي بالعلامة خلال هذا الأسبوع.',
    address: 'حمص — الإنشاءات',
    addressDetail: 'شارع الغوطة الرئيسي — جانب سوق الخضار'
  },
  {
    id: 'c31',
    advertiserId: 'adv18',
    advertiserName: 'أزياء حمص',
    title: 'إطلاق مجموعة أزياء الشتاء',
    reels: 1,
    stories: 3,
    posts: 0,
    budget: 3500,
    duration: 'هذا الأسبوع',
    goal: 'الوعي بالعلامة',
    status: 'in_progress',
    createdAt: '2026-11-14',
    invites: [],
    category: 'أزياء',
    desc: 'حملة إطلاق مجموعة أزياء الشتاء — مشروع مميز في مجال أزياء يقدم خدمات عالية الجودة لأهالي حمص. تستهدف الوعي بالعلامة خلال هذا الأسبوع.',
    address: 'حمص — الإنشاءات',
    addressDetail: 'شارع الغوطة الرئيسي — جانب سوق الخضار'
  },
  {
    id: 'c32',
    advertiserId: 'adv18',
    advertiserName: 'أزياء حمص',
    title: 'حملة أزياء العيد — خصم 30%',
    reels: 3,
    stories: 4,
    posts: 0,
    budget: 1000,
    duration: 'شهر',
    goal: 'الوعي بالعلامة',
    status: 'in_progress',
    createdAt: '2026-11-13',
    invites: [],
    category: 'أزياء',
    desc: 'حملة حملة أزياء العيد — خصم 30% — مشروع مميز في مجال أزياء يقدم خدمات عالية الجودة لأهالي حمص. تستهدف الوعي بالعلامة خلال شهر.',
    address: 'حمص — الإنشاءات',
    addressDetail: 'شارع الغوطة الرئيسي — جانب سوق الخضار'
  },
  {
    id: 'c33',
    advertiserId: 'adv19',
    advertiserName: 'تقنية بلس',
    title: 'مراجعة سماعات لاسلكية جديدة',
    reels: 3,
    stories: 3,
    posts: 2,
    budget: 4500,
    duration: 'هذا الأسبوع',
    goal: 'زيادة المبيعات',
    status: 'active',
    createdAt: '2026-11-17',
    invites: [],
    category: 'تقنية',
    desc: 'حملة مراجعة سماعات لاسلكية جديدة — مشروع مميز في مجال تقنية يقدم خدمات عالية الجودة لأهالي حمص. تستهدف زيادة المبيعات خلال هذا الأسبوع.',
    address: 'حمص — الغوطة',
    addressDetail: 'شارع الميدان — قرب دوار الساعة'
  },
  {
    id: 'c34',
    advertiserId: 'adv19',
    advertiserName: 'تقنية بلس',
    title: 'إطلاق هواتف ذكية — حملة العيد',
    reels: 1,
    stories: 3,
    posts: 1,
    budget: 3000,
    duration: 'هذا الأسبوع',
    goal: 'زيادة المتابعين',
    status: 'active',
    createdAt: '2026-11-17',
    invites: [],
    category: 'تقنية',
    desc: 'حملة إطلاق هواتف ذكية — حملة العيد — مشروع مميز في مجال تقنية يقدم خدمات عالية الجودة لأهالي حمص. تستهدف زيادة المتابعين خلال هذا الأسبوع.',
    address: 'حمص — الغوطة',
    addressDetail: 'شارع الميدان — قرب دوار الساعة'
  },
  {
    id: 'c35',
    advertiserId: 'adv19',
    advertiserName: 'تقنية بلس',
    title: 'حملة خصومات الإلكترونيات',
    reels: 2,
    stories: 6,
    posts: 1,
    budget: 1000,
    duration: 'أسبوعان',
    goal: 'الوعي بالعلامة',
    status: 'active',
    createdAt: '2026-11-23',
    invites: [],
    category: 'تقنية',
    desc: 'حملة حملة خصومات الإلكترونيات — مشروع مميز في مجال تقنية يقدم خدمات عالية الجودة لأهالي حمص. تستهدف الوعي بالعلامة خلال أسبوعان.',
    address: 'حمص — الغوطة',
    addressDetail: 'شارع الميدان — قرب دوار الساعة'
  },
  {
    id: 'c36',
    advertiserId: 'adv20',
    advertiserName: 'متجر التقنية',
    title: 'مراجعة سماعات لاسلكية جديدة',
    reels: 3,
    stories: 2,
    posts: 1,
    budget: 2000,
    duration: 'أسبوعان',
    goal: 'زيادة المبيعات',
    status: 'active',
    createdAt: '2026-11-25',
    invites: [],
    category: 'تقنية',
    desc: 'حملة مراجعة سماعات لاسلكية جديدة — مشروع مميز في مجال تقنية يقدم خدمات عالية الجودة لأهالي حمص. تستهدف زيادة المبيعات خلال أسبوعان.',
    address: 'حمص — كرم الشامي',
    addressDetail: 'شارع الوعر — مقابل مشفى الكندي'
  },
  {
    id: 'c37',
    advertiserId: 'adv20',
    advertiserName: 'متجر التقنية',
    title: 'إطلاق هواتف ذكية — حملة العيد',
    reels: 1,
    stories: 2,
    posts: 2,
    budget: 4500,
    duration: 'هذا الأسبوع',
    goal: 'الوعي بالعلامة',
    status: 'completed',
    createdAt: '2026-11-25',
    invites: [],
    category: 'تقنية',
    desc: 'حملة إطلاق هواتف ذكية — حملة العيد — مشروع مميز في مجال تقنية يقدم خدمات عالية الجودة لأهالي حمص. تستهدف الوعي بالعلامة خلال هذا الأسبوع.',
    address: 'حمص — كرم الشامي',
    addressDetail: 'شارع الوعر — مقابل مشفى الكندي'
  },
  {
    id: 'c38',
    advertiserId: 'adv20',
    advertiserName: 'متجر التقنية',
    title: 'حملة خصومات الإلكترونيات',
    reels: 3,
    stories: 5,
    posts: 2,
    budget: 2000,
    duration: 'أسبوعان',
    goal: 'زيادة المبيعات',
    status: 'completed',
    createdAt: '2026-11-26',
    invites: [],
    category: 'تقنية',
    desc: 'حملة حملة خصومات الإلكترونيات — مشروع مميز في مجال تقنية يقدم خدمات عالية الجودة لأهالي حمص. تستهدف زيادة المبيعات خلال أسبوعان.',
    address: 'حمص — كرم الشامي',
    addressDetail: 'شارع الوعر — مقابل مشفى الكندي'
  },
  {
    id: 'c39',
    advertiserId: 'adv21',
    advertiserName: 'عالم التقنية',
    title: 'مراجعة سماعات لاسلكية جديدة',
    reels: 3,
    stories: 4,
    posts: 0,
    budget: 2500,
    duration: 'هذا الأسبوع',
    goal: 'زيادة المتابعين',
    status: 'active',
    createdAt: '2026-11-29',
    invites: [],
    category: 'تقنية',
    desc: 'حملة مراجعة سماعات لاسلكية جديدة — مشروع مميز في مجال تقنية يقدم خدمات عالية الجودة لأهالي حمص. تستهدف زيادة المتابعين خلال هذا الأسبوع.',
    address: 'حمص — وادي الذهب',
    addressDetail: 'شارع الحميدية — سوق الحميدية القديم'
  },
  {
    id: 'c40',
    advertiserId: 'adv21',
    advertiserName: 'عالم التقنية',
    title: 'إطلاق هواتف ذكية — حملة العيد',
    reels: 2,
    stories: 2,
    posts: 2,
    budget: 1500,
    duration: 'أسبوعان',
    goal: 'الوعي بالعلامة',
    status: 'in_progress',
    createdAt: '2026-12-02',
    invites: [],
    category: 'تقنية',
    desc: 'حملة إطلاق هواتف ذكية — حملة العيد — مشروع مميز في مجال تقنية يقدم خدمات عالية الجودة لأهالي حمص. تستهدف الوعي بالعلامة خلال أسبوعان.',
    address: 'حمص — وادي الذهب',
    addressDetail: 'شارع الحميدية — سوق الحميدية القديم'
  },
  {
    id: 'c41',
    advertiserId: 'adv22',
    advertiserName: 'إلكترونيات حمص',
    title: 'مراجعة سماعات لاسلكية جديدة',
    reels: 0,
    stories: 3,
    posts: 0,
    budget: 4000,
    duration: 'أسبوعان',
    goal: 'زيادة المبيعات',
    status: 'active',
    createdAt: '2026-12-01',
    invites: [],
    category: 'تقنية',
    desc: 'حملة مراجعة سماعات لاسلكية جديدة — مشروع مميز في مجال تقنية يقدم خدمات عالية الجودة لأهالي حمص. تستهدف زيادة المبيعات خلال أسبوعان.',
    address: 'حمص — عكرمة',
    addressDetail: 'شارع الإنشاءات — قرب جامعة البعث'
  },
  {
    id: 'c42',
    advertiserId: 'adv23',
    advertiserName: 'لياقة برو',
    title: 'تحدي 30 يوم لياقة',
    reels: 2,
    stories: 2,
    posts: 1,
    budget: 2000,
    duration: 'شهر',
    goal: 'زيادة المتابعين',
    status: 'active',
    createdAt: '2026-12-06',
    invites: [],
    category: 'رياضة',
    desc: 'حملة تحدي 30 يوم لياقة — مشروع مميز في مجال رياضة يقدم خدمات عالية الجودة لأهالي حمص. تستهدف زيادة المتابعين خلال شهر.',
    address: 'حمص — الوعر',
    addressDetail: 'شارع الكورنيش — مقابل نادي الضباط'
  },
  {
    id: 'c43',
    advertiserId: 'adv23',
    advertiserName: 'لياقة برو',
    title: 'حملة افتتاح الصالة الجديدة',
    reels: 2,
    stories: 6,
    posts: 1,
    budget: 1500,
    duration: 'أسبوعان',
    goal: 'زيادة المبيعات',
    status: 'active',
    createdAt: '2026-12-05',
    invites: [],
    category: 'رياضة',
    desc: 'حملة حملة افتتاح الصالة الجديدة — مشروع مميز في مجال رياضة يقدم خدمات عالية الجودة لأهالي حمص. تستهدف زيادة المبيعات خلال أسبوعان.',
    address: 'حمص — الوعر',
    addressDetail: 'شارع الكورنيش — مقابل نادي الضباط'
  },
  {
    id: 'c44',
    advertiserId: 'adv24',
    advertiserName: 'نادي حمص الرياضي',
    title: 'تحدي 30 يوم لياقة',
    reels: 1,
    stories: 4,
    posts: 1,
    budget: 4500,
    duration: 'هذا الأسبوع',
    goal: 'الوعي بالعلامة',
    status: 'active',
    createdAt: '2026-12-09',
    invites: [],
    category: 'رياضة',
    desc: 'حملة تحدي 30 يوم لياقة — مشروع مميز في مجال رياضة يقدم خدمات عالية الجودة لأهالي حمص. تستهدف الوعي بالعلامة خلال هذا الأسبوع.',
    address: 'حمص — بابا عمرو',
    addressDetail: 'شارع بابا عمرو — جانب مسجد خالد'
  },
  {
    id: 'c45',
    advertiserId: 'adv25',
    advertiserName: 'صالة القوة',
    title: 'تحدي 30 يوم لياقة',
    reels: 3,
    stories: 6,
    posts: 1,
    budget: 3000,
    duration: 'هذا الأسبوع',
    goal: 'زيادة المتابعين',
    status: 'active',
    createdAt: '2026-12-09',
    invites: [],
    category: 'رياضة',
    desc: 'حملة تحدي 30 يوم لياقة — مشروع مميز في مجال رياضة يقدم خدمات عالية الجودة لأهالي حمص. تستهدف زيادة المتابعين خلال هذا الأسبوع.',
    address: 'حمص — القصور',
    addressDetail: 'حي القصور — الشارع العام'
  },
  {
    id: 'c46',
    advertiserId: 'adv25',
    advertiserName: 'صالة القوة',
    title: 'حملة افتتاح الصالة الجديدة',
    reels: 0,
    stories: 1,
    posts: 2,
    budget: 3000,
    duration: 'هذا الأسبوع',
    goal: 'زيادة المبيعات',
    status: 'active',
    createdAt: '2026-12-14',
    invites: [],
    category: 'رياضة',
    desc: 'حملة حملة افتتاح الصالة الجديدة — مشروع مميز في مجال رياضة يقدم خدمات عالية الجودة لأهالي حمص. تستهدف زيادة المبيعات خلال هذا الأسبوع.',
    address: 'حمص — القصور',
    addressDetail: 'حي القصور — الشارع العام'
  },
  {
    id: 'c47',
    advertiserId: 'adv25',
    advertiserName: 'صالة القوة',
    title: 'تغطية بطولة حمص الرياضية',
    reels: 1,
    stories: 4,
    posts: 1,
    budget: 1000,
    duration: 'أسبوعان',
    goal: 'زيادة المتابعين',
    status: 'cancelled',
    createdAt: '2026-12-17',
    invites: [],
    category: 'رياضة',
    desc: 'حملة تغطية بطولة حمص الرياضية — مشروع مميز في مجال رياضة يقدم خدمات عالية الجودة لأهالي حمص. تستهدف زيادة المتابعين خلال أسبوعان.',
    address: 'حمص — القصور',
    addressDetail: 'حي القصور — الشارع العام'
  },
  {
    id: 'c48',
    advertiserId: 'adv26',
    advertiserName: 'وكالة سفر حمص',
    title: 'حملة عروض السفر الصيفية',
    reels: 3,
    stories: 1,
    posts: 1,
    budget: 3000,
    duration: 'هذا الأسبوع',
    goal: 'الوعي بالعلامة',
    status: 'active',
    createdAt: '2026-12-16',
    invites: [],
    category: 'سفر',
    desc: 'حملة حملة عروض السفر الصيفية — مشروع مميز في مجال سفر يقدم خدمات عالية الجودة لأهالي حمص. تستهدف الوعي بالعلامة خلال هذا الأسبوع.',
    address: 'حمص — الزهراء',
    addressDetail: 'شارع الزهراء — مقابل مدرسة الشهيد'
  },
  {
    id: 'c49',
    advertiserId: 'adv26',
    advertiserName: 'وكالة سفر حمص',
    title: 'تغطية رحلات داخلية لحمص',
    reels: 3,
    stories: 1,
    posts: 0,
    budget: 2500,
    duration: 'هذا الأسبوع',
    goal: 'زيادة المبيعات',
    status: 'cancelled',
    createdAt: '2026-12-19',
    invites: [],
    category: 'سفر',
    desc: 'حملة تغطية رحلات داخلية لحمص — مشروع مميز في مجال سفر يقدم خدمات عالية الجودة لأهالي حمص. تستهدف زيادة المبيعات خلال هذا الأسبوع.',
    address: 'حمص — الزهراء',
    addressDetail: 'شارع الزهراء — مقابل مدرسة الشهيد'
  },
  {
    id: 'c50',
    advertiserId: 'adv27',
    advertiserName: 'رحلات حمص',
    title: 'حملة عروض السفر الصيفية',
    reels: 1,
    stories: 5,
    posts: 0,
    budget: 3000,
    duration: 'شهر',
    goal: 'الوعي بالعلامة',
    status: 'active',
    createdAt: '2026-12-21',
    invites: [],
    category: 'سفر',
    desc: 'حملة حملة عروض السفر الصيفية — مشروع مميز في مجال سفر يقدم خدمات عالية الجودة لأهالي حمص. تستهدف الوعي بالعلامة خلال شهر.',
    address: 'حمص — الدبلان',
    addressDetail: 'شارع عكرمة — قرب فرن الآلي'
  },
  {
    id: 'c51',
    advertiserId: 'adv27',
    advertiserName: 'رحلات حمص',
    title: 'تغطية رحلات داخلية لحمص',
    reels: 1,
    stories: 3,
    posts: 1,
    budget: 3500,
    duration: 'هذا الأسبوع',
    goal: 'زيادة المبيعات',
    status: 'completed',
    createdAt: '2026-12-22',
    invites: [],
    category: 'سفر',
    desc: 'حملة تغطية رحلات داخلية لحمص — مشروع مميز في مجال سفر يقدم خدمات عالية الجودة لأهالي حمص. تستهدف زيادة المبيعات خلال هذا الأسبوع.',
    address: 'حمص — الدبلان',
    addressDetail: 'شارع عكرمة — قرب فرن الآلي'
  },
  {
    id: 'c52',
    advertiserId: 'adv28',
    advertiserName: 'سفر وسياحة حمص',
    title: 'حملة عروض السفر الصيفية',
    reels: 2,
    stories: 6,
    posts: 2,
    budget: 2500,
    duration: 'هذا الأسبوع',
    goal: 'زيادة المتابعين',
    status: 'active',
    createdAt: '2026-12-26',
    invites: [],
    category: 'سفر',
    desc: 'حملة حملة عروض السفر الصيفية — مشروع مميز في مجال سفر يقدم خدمات عالية الجودة لأهالي حمص. تستهدف زيادة المتابعين خلال هذا الأسبوع.',
    address: 'حمص — باب السباع',
    addressDetail: 'شارع وادي الذهب — جانب حديقة الطلائع'
  },
  {
    id: 'c53',
    advertiserId: 'adv28',
    advertiserName: 'سفر وسياحة حمص',
    title: 'تغطية رحلات داخلية لحمص',
    reels: 2,
    stories: 1,
    posts: 2,
    budget: 4500,
    duration: 'شهر',
    goal: 'زيادة المتابعين',
    status: 'in_progress',
    createdAt: '2026-12-25',
    invites: [],
    category: 'سفر',
    desc: 'حملة تغطية رحلات داخلية لحمص — مشروع مميز في مجال سفر يقدم خدمات عالية الجودة لأهالي حمص. تستهدف زيادة المتابعين خلال شهر.',
    address: 'حمص — باب السباع',
    addressDetail: 'شارع وادي الذهب — جانب حديقة الطلائع'
  },
  {
    id: 'c54',
    advertiserId: 'adv29',
    advertiserName: 'مكتب السفر الذهبي',
    title: 'حملة عروض السفر الصيفية',
    reels: 2,
    stories: 2,
    posts: 0,
    budget: 4000,
    duration: 'هذا الأسبوع',
    goal: 'زيادة المتابعين',
    status: 'active',
    createdAt: '2026-12-28',
    invites: [],
    category: 'سفر',
    desc: 'حملة حملة عروض السفر الصيفية — مشروع مميز في مجال سفر يقدم خدمات عالية الجودة لأهالي حمص. تستهدف زيادة المتابعين خلال هذا الأسبوع.',
    address: 'حمص — الخالدية',
    addressDetail: 'شارع باب السباع — قرب القلعة'
  },
  {
    id: 'c55',
    advertiserId: 'adv29',
    advertiserName: 'مكتب السفر الذهبي',
    title: 'تغطية رحلات داخلية لحمص',
    reels: 0,
    stories: 2,
    posts: 0,
    budget: 2500,
    duration: 'شهر',
    goal: 'زيادة المبيعات',
    status: 'in_progress',
    createdAt: '2026-12-31',
    invites: [],
    category: 'سفر',
    desc: 'حملة تغطية رحلات داخلية لحمص — مشروع مميز في مجال سفر يقدم خدمات عالية الجودة لأهالي حمص. تستهدف زيادة المبيعات خلال شهر.',
    address: 'حمص — الخالدية',
    addressDetail: 'شارع باب السباع — قرب القلعة'
  },
  {
    id: 'c56',
    advertiserId: 'adv30',
    advertiserName: 'بيت العود',
    title: 'عطر المسك الفاخر — حملة العيد',
    reels: 0,
    stories: 2,
    posts: 2,
    budget: 4500,
    duration: 'هذا الأسبوع',
    goal: 'زيادة المتابعين',
    status: 'active',
    createdAt: '2027-01-01',
    invites: [],
    category: 'عطور',
    desc: 'حملة عطر المسك الفاخر — حملة العيد — مشروع مميز في مجال عطور يقدم خدمات عالية الجودة لأهالي حمص. تستهدف زيادة المتابعين خلال هذا الأسبوع.',
    address: 'حمص — النزهة',
    addressDetail: 'شارع الخالدية — مقابل السوق المغطى'
  },
  {
    id: 'c57',
    advertiserId: 'adv31',
    advertiserName: 'عطور حمص',
    title: 'عطر المسك الفاخر — حملة العيد',
    reels: 0,
    stories: 3,
    posts: 1,
    budget: 4500,
    duration: 'شهر',
    goal: 'الوعي بالعلامة',
    status: 'active',
    createdAt: '2027-01-05',
    invites: [],
    category: 'عطور',
    desc: 'حملة عطر المسك الفاخر — حملة العيد — مشروع مميز في مجال عطور يقدم خدمات عالية الجودة لأهالي حمص. تستهدف الوعي بالعلامة خلال شهر.',
    address: 'حمص — الميدان',
    addressDetail: 'شارع النزهة — جانب مقهى الروضة'
  },
  {
    id: 'c58',
    advertiserId: 'adv32',
    advertiserName: 'عبير الشرق',
    title: 'عطر المسك الفاخر — حملة العيد',
    reels: 1,
    stories: 6,
    posts: 1,
    budget: 4500,
    duration: 'شهر',
    goal: 'زيادة المبيعات',
    status: 'active',
    createdAt: '2027-01-08',
    invites: [],
    category: 'عطور',
    desc: 'حملة عطر المسك الفاخر — حملة العيد — مشروع مميز في مجال عطور يقدم خدمات عالية الجودة لأهالي حمص. تستهدف زيادة المبيعات خلال شهر.',
    address: 'حمص — جورة الشياح',
    addressDetail: 'شارع جورة الشياح — قرب البلدية'
  },
  {
    id: 'c59',
    advertiserId: 'adv32',
    advertiserName: 'عبير الشرق',
    title: 'إطلاق عطر حمص المميز',
    reels: 1,
    stories: 4,
    posts: 1,
    budget: 4000,
    duration: 'هذا الأسبوع',
    goal: 'الوعي بالعلامة',
    status: 'in_progress',
    createdAt: '2027-01-10',
    invites: [],
    category: 'عطور',
    desc: 'حملة إطلاق عطر حمص المميز — مشروع مميز في مجال عطور يقدم خدمات عالية الجودة لأهالي حمص. تستهدف الوعي بالعلامة خلال هذا الأسبوع.',
    address: 'حمص — جورة الشياح',
    addressDetail: 'شارع جورة الشياح — قرب البلدية'
  },
  {
    id: 'c60',
    advertiserId: 'adv33',
    advertiserName: 'صيدلية الصحة',
    title: 'حملة التوعية الصحية',
    reels: 3,
    stories: 4,
    posts: 1,
    budget: 4000,
    duration: 'أسبوعان',
    goal: 'زيادة المتابعين',
    status: 'active',
    createdAt: '2027-01-11',
    invites: [],
    category: 'صحة',
    desc: 'حملة حملة التوعية الصحية — مشروع مميز في مجال صحة يقدم خدمات عالية الجودة لأهالي حمص. تستهدف زيادة المتابعين خلال أسبوعان.',
    address: 'حمص — الحميدية',
    addressDetail: 'شارع الحضارة — مقابل حديقة الدبلان'
  },
  {
    id: 'c61',
    advertiserId: 'adv33',
    advertiserName: 'صيدلية الصحة',
    title: 'تغطية خدمات العيادة الجديدة',
    reels: 3,
    stories: 4,
    posts: 2,
    budget: 1500,
    duration: 'هذا الأسبوع',
    goal: 'الوعي بالعلامة',
    status: 'in_progress',
    createdAt: '2027-01-13',
    invites: [],
    category: 'صحة',
    desc: 'حملة تغطية خدمات العيادة الجديدة — مشروع مميز في مجال صحة يقدم خدمات عالية الجودة لأهالي حمص. تستهدف الوعي بالعلامة خلال هذا الأسبوع.',
    address: 'حمص — الحميدية',
    addressDetail: 'شارع الحضارة — مقابل حديقة الدبلان'
  },
  {
    id: 'c62',
    advertiserId: 'adv34',
    advertiserName: 'مركز الصحة والعافية',
    title: 'حملة التوعية الصحية',
    reels: 2,
    stories: 4,
    posts: 1,
    budget: 2000,
    duration: 'أسبوعان',
    goal: 'زيادة المتابعين',
    status: 'active',
    createdAt: '2027-01-16',
    invites: [],
    category: 'صحة',
    desc: 'حملة حملة التوعية الصحية — مشروع مميز في مجال صحة يقدم خدمات عالية الجودة لأهالي حمص. تستهدف زيادة المتابعين خلال أسبوعان.',
    address: 'حمص — الإنشاءات',
    addressDetail: 'شارع الغوطة الرئيسي — جانب سوق الخضار'
  },
  {
    id: 'c63',
    advertiserId: 'adv35',
    advertiserName: 'عيادة حمص',
    title: 'حملة التوعية الصحية',
    reels: 1,
    stories: 4,
    posts: 0,
    budget: 3500,
    duration: 'أسبوعان',
    goal: 'زيادة المتابعين',
    status: 'active',
    createdAt: '2027-01-15',
    invites: [],
    category: 'صحة',
    desc: 'حملة حملة التوعية الصحية — مشروع مميز في مجال صحة يقدم خدمات عالية الجودة لأهالي حمص. تستهدف زيادة المتابعين خلال أسبوعان.',
    address: 'حمص — الغوطة',
    addressDetail: 'شارع الميدان — قرب دوار الساعة'
  },
  {
    id: 'c64',
    advertiserId: 'adv36',
    advertiserName: 'مخبز الصحة',
    title: 'حملة التوعية الصحية',
    reels: 0,
    stories: 1,
    posts: 1,
    budget: 1500,
    duration: 'أسبوعان',
    goal: 'زيادة المتابعين',
    status: 'active',
    createdAt: '2027-01-20',
    invites: [],
    category: 'صحة',
    desc: 'حملة حملة التوعية الصحية — مشروع مميز في مجال صحة يقدم خدمات عالية الجودة لأهالي حمص. تستهدف زيادة المتابعين خلال أسبوعان.',
    address: 'حمص — كرم الشامي',
    addressDetail: 'شارع الوعر — مقابل مشفى الكندي'
  },
  {
    id: 'c65',
    advertiserId: 'adv36',
    advertiserName: 'مخبز الصحة',
    title: 'تغطية خدمات العيادة الجديدة',
    reels: 3,
    stories: 3,
    posts: 1,
    budget: 2500,
    duration: 'أسبوعان',
    goal: 'الوعي بالعلامة',
    status: 'in_progress',
    createdAt: '2027-01-21',
    invites: [],
    category: 'صحة',
    desc: 'حملة تغطية خدمات العيادة الجديدة — مشروع مميز في مجال صحة يقدم خدمات عالية الجودة لأهالي حمص. تستهدف الوعي بالعلامة خلال أسبوعان.',
    address: 'حمص — كرم الشامي',
    addressDetail: 'شارع الوعر — مقابل مشفى الكندي'
  }
]

// helpers
const statusMap = {
  draft: { label: 'مسودة', cls: 'bg-zinc-100 text-zinc-600 border-zinc-200 dark:bg-zinc-800 dark:text-zinc-400 dark:border-zinc-700' },
  active: { label: 'نشطة', cls: 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/20 dark:text-emerald-300 dark:border-emerald-800' },
  in_progress: { label: 'قيد التنفيذ', cls: 'bg-teal-50 text-teal-700 border-teal-200 dark:bg-teal-900/20 dark:text-teal-300 dark:border-teal-800' },
  completed: { label: 'مكتملة', cls: 'bg-slate-100 text-slate-600 border-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700' },
  cancelled: { label: 'ملغاة', cls: 'bg-red-50 text-red-600 border-red-200 dark:bg-red-900/20 dark:text-red-300 dark:border-red-800' },
};

function formatNum(n) {
  if (n == null) return '—';
  const v = typeof n === 'object' ? (n.ig || n.fb || 0) : Number(n);
  if (v >= 1000000) return (v / 1000000).toFixed(1) + 'م';
  if (v >= 1000) return (v / 1000).toFixed(v >= 10000 ? 0 : 1) + ' ألف';
  return String(v);
}
function getInfFollowers(inf) {
  if (!inf) return 0;
  if (typeof inf.followers === 'number') return inf.followers;
  if (inf.followersByPlatform) return Number(inf.followersByPlatform.ig || inf.followersByPlatform.fb || inf.followers?.ig || inf.followers?.fb || 0);
  if (typeof inf.followers === 'object') return Number(inf.followers.ig || inf.followers.fb || 0);
  return Number(inf.followers || 0);
}
function getInfHandle(inf) {
  if (!inf) return '';
  if (inf.handles) return inf.handles.ig || inf.handles.fb || inf.handle || '';
  return inf.handle || '';
}
function getInfPlatform(inf) {
  if (!inf) return 'instagram';
  if (inf.platforms) return inf.platforms.instagram && inf.platforms.facebook ? 'both' : inf.platforms.instagram ? 'instagram' : 'facebook';
  return inf.platform || 'instagram';
}

// ============ PHASE 0: SHARED CONSTANTS & HELPERS ============
const INTERESTS = ['فعاليات', 'مطاعم', 'تجميل', 'مكياج', 'أزياء', 'تقنية', 'رياضة', 'سفر', 'عطور', 'صحة'];
const DURATIONS = ['هذا الأسبوع', 'أسبوعان', 'شهر'];
function sanitizeDigits(v) { return String(v ?? '').replace(/\D/g, ''); }
function onlyDigitsKey(e) {
  const ok = e.ctrlKey || e.metaKey || ['Backspace', 'Delete', 'Tab', 'ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(e.key);
  if (ok) return;
  if (!/^\d$/.test(e.key)) e.preventDefault();
}
function onDigitsPaste(e, setter) {
  const t = (e.clipboardData || window.clipboardData).getData('text');
  if (/\D/.test(t)) {
    e.preventDefault();
    const d = sanitizeDigits(t);
    const el = e.target; const s = el.selectionStart ?? el.value.length, en = el.selectionEnd ?? s;
    const nv = el.value.slice(0, s) + d + el.value.slice(en);
    setter(sanitizeDigits(nv));
  }
}


// Demo-only reputation fixtures; independent of campaign counts and invitations.
const mockCompletedCollaborations = mockInfluencers.flatMap((inf, index) => {
  if (index % 4 === 3) return [];
  const partners = mockAdvertisers.filter((adv, i) => i % 5 !== 4 &&
    adv.interests.some(tag => inf.interests.includes(tag)));
  const pool = partners.length ? partners : mockAdvertisers.filter((_, i) => i % 5 !== 4);
  return Array.from({ length: 8 + (index * 7) % 25 }, (_, n) => ({
    id: `demo-collab-${inf.id}-${n + 1}`,
    influencerId: inf.id,
    advertiserId: pool[n % pool.length].id,
    status: 'completed',
    confirmedByInfluencer: true,
    confirmedByAdvertiser: true,
    influencerRating: n % 4 === 0 ? null : 3 + ((n + index) % 3),
    advertiserRating: n % 3 === 0 ? null : 3 + ((n + index + 1) % 3),
  }));
});

function summarizeReputation(records, accountId, role) {
  const idKey = role === 'advertiser' ? 'advertiserId' : 'influencerId';
  const ratingKey = role === 'advertiser' ? 'advertiserRating' : 'influencerRating';
  const seen = new Set();
  let completedCollaborations = 0, ratingTotal = 0, ratingCount = 0;
  for (const record of records) {
    if (!record.id || seen.has(record.id) || record[idKey] !== accountId ||
        record.status !== 'completed' || !record.confirmedByInfluencer ||
        !record.confirmedByAdvertiser) continue;
    seen.add(record.id);
    completedCollaborations += 1;
    const rating = record[ratingKey];
    if (Number.isInteger(rating) && rating >= 1 && rating <= 5) {
      ratingTotal += rating;
      ratingCount += 1;
    }
  }
  return { completedCollaborations, ratingTotal, ratingCount };
}

mockAdvertisers.forEach(account => Object.assign(account,
  summarizeReputation(mockCompletedCollaborations, account.id, 'advertiser')));
mockInfluencers.forEach(account => Object.assign(account,
  summarizeReputation(mockCompletedCollaborations, account.id, 'influencer')));

function getReputation(account, mode = 'live') {
  if (mode !== 'demo' || !account) return {
    completedCollaborations: 0, ratingTotal: 0, ratingCount: 0, average: null,
  };
  const completedCollaborations = Math.max(0, Math.floor(Number(account.completedCollaborations) || 0));
  const ratingCount = Math.max(0, Math.floor(Number(account.ratingCount) || 0));
  const ratingTotal = Number(account.ratingTotal) || 0;
  return { completedCollaborations, ratingTotal, ratingCount,
    average: ratingCount > 0 ? ratingTotal / ratingCount : null };
}

function compareReputation(a, b) {
  const left = getReputation(a, 'demo'), right = getReputation(b, 'demo');
  return right.completedCollaborations - left.completedCollaborations ||
    (right.average ?? -1) - (left.average ?? -1) ||
    right.ratingCount - left.ratingCount;
}

function matchesInterests(account, interests = []) {
  return interests.length > 0 && (account?.interests || []).some(tag => interests.includes(tag));
}

function rankAccounts(accounts, interests = [], newcomerEvery = 5,
    rotation = Math.floor(Date.now() / 86400000)) {
  const groups = interests.length
    ? [accounts.filter(a => matchesInterests(a, interests)),
       accounts.filter(a => !matchesInterests(a, interests))]
    : [accounts];
  return groups.flatMap(group => {
    const sorted = [...group].sort(compareReputation);
    const established = sorted.filter(a => getReputation(a, 'demo').completedCollaborations > 0);
    const newcomers = sorted.filter(a => getReputation(a, 'demo').completedCollaborations === 0);
    const offset = newcomers.length ? rotation % newcomers.length : 0;
    const rotated = [...newcomers.slice(offset), ...newcomers.slice(0, offset)];
    const result = [];
    let oldIndex = 0, newIndex = 0;
    const interval = Math.max(2, newcomerEvery);
    while (oldIndex < established.length || newIndex < rotated.length) {
      if (newIndex < rotated.length &&
          (oldIndex >= established.length || (result.length + 1) % interval === 0)) {
        result.push(rotated[newIndex++]);
      } else {
        result.push(established[oldIndex++]);
      }
    }
    return result;
  });
}

function getCampaignAdvertiser(campaign, ownAccount = null) {
  return campaign.advertiserId === 'me' ? ownAccount :
    mockAdvertisers.find(account => account.id === campaign.advertiserId);
}

function rankCampaigns(items, interests = [], ownAccount = null) {
  const groups = interests.length
    ? [items.filter(c => interests.includes(c.category)),
       items.filter(c => !interests.includes(c.category))]
    : [items];
  return groups.flatMap(group => ['active', 'in_progress', 'completed'].flatMap(status => {
    const eligible = group.filter(c => c.status === status);
    const owners = [...new Map(eligible.map(c => {
      const owner = getCampaignAdvertiser(c, ownAccount) || { id: c.advertiserId };
      return [owner.id, owner];
    })).values()];
    const ownerOrder = new Map(rankAccounts(owners).map((owner, i) => [owner.id, i]));
    return [...eligible].sort((a, b) =>
      ownerOrder.get(getCampaignAdvertiser(a, ownAccount)?.id || a.advertiserId) -
      ownerOrder.get(getCampaignAdvertiser(b, ownAccount)?.id || b.advertiserId) ||
      String(b.createdAt || '').localeCompare(String(a.createdAt || '')));
  }));
}

function ReputationSummary({ account, mode, compact = false }) {
  const stats = getReputation(account, mode);
  return (
    <div className={`flex-colum  items-center gap-x-2 gap-y-1 mt-1 ${compact ? 'text-[10px]' : 'text-[11px]'} text-slate-500 dark:text-slate-400`}
      title={mode === 'demo' ? 'إحصاءات تجريبية للعرض فقط؛ التقييم غير تفاعلي' : 'إحصاءات الحساب — لا توجد بيانات مسجلة بعد'}>
      <div className="  ">
        <span className="inline-flex items-center gap-1 font-bold text-wasla dark:text-teal-300">
          <i className="ri-shake-hands-line" aria-hidden="true"></i>
          {stats.completedCollaborations} تعاون مكتمل
        </span>
      </div>
      <div className="  ">
        <span className="inline-flex items-center gap-1">
        <i className="ri-star-fill text-amber-500" aria-hidden="true">

        </i>
        {stats.average === null ? 'لا توجد تقييمات بعد' :
          <><bdi dir="ltr">{stats.average.toFixed(1)}/5</bdi><span>({stats.ratingCount} تقييم)</span></>}
      </span>
      </div>
      {/* {mode === 'demo' && <span className="text-[9px] opacity-80">تجريبي</span>} */}
    </div>
  );
}

// ============ REUSABLE COMPONENTS ============
function Badge({ status }) {
  const s = statusMap[status] || statusMap.draft;
  return <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold border tracking-wide ${s.cls}`}>{status === 'active' && <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>}{status === 'in_progress' && <span className="w-1.5 h-1.5 rounded-full bg-teal-500"></span>}{s.label}</span>;
}
function Toast({ msg, type, onClose }) {
  useEffect(() => { if (msg) { const t = setTimeout(onClose, 6000); return () => clearTimeout(t); } }, [msg]);
  if (!msg) return null;
  const cfg = type === 'error'
    ? { bg: 'bg-white dark:bg-[#20302D] border-red-200 dark:border-red-800', accent: 'bg-red-500', icon: 'ri-error-warning-line text-red-500', text: 'text-ink dark:text-white' }
    : type === 'success'
      ? { bg: 'bg-white dark:bg-[#20302D] border-emerald-200 dark:border-emerald-800', accent: 'bg-emerald-500', icon: 'ri-checkbox-circle-line text-emerald-500', text: 'text-ink dark:text-white' }
      : { bg: 'bg-white dark:bg-[#20302D] border-slate-200 dark:border-slate-700', accent: 'bg-wasla', icon: 'ri-information-line text-wasla', text: 'text-ink dark:text-white' };
  return (
    <div style={{ animation: 'toastIn .42s cubic-bezier(.16,1,.3,1) both' }} className={`fixed wasla-toast left-1/2 -translate-x-1/2 ${cfg.bg} ${cfg.text} px-5 py-3.5 rounded-2xl shadow-soft border flex-colum items-center gap-3 text-[10px] font-bold z-[100] max-w-[92vw]`}>
      {/* <span className={`w-8 h-8 rounded-full ${cfg.accent} text-white grid place-items-center shrink-0`}>
        <i className={cfg.icon.replace('text-', 'text-white ')}></i>
      </span> */}
      <span className="leading-snug">{msg}</span>
      <div className="flex justify-center w-full mt-2 mx-auto">
        <button onClick={onClose} className="ms-2 w-15 h-7 rounded-full bg-slate-100 dark:bg-slate-700 grid place-items-center shrink-0 hover:bg-slate-200  ">
        <i className="ri-close-line text-sm ">إلغاء</i>
      </button>
      </div>
    </div>
  );
}
function Modal({ open, onClose, title, children, wide }) {
  const [render, setRender] = useState(false);
  const [show, setShow] = useState(false);
  useEffect(() => {
    if (open) { setRender(true); requestAnimationFrame(() => requestAnimationFrame(() => setShow(true))); }
    else if (render) { setShow(false); const t = setTimeout(() => setRender(false), 220); return () => clearTimeout(t); }
  }, [open]);
  if (!render) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div onClick={onClose} className={`absolute inset-0 bg-[#101918]/50 backdrop-blur-[6px] transition-opacity duration-200 ${show ? 'opacity-100' : 'opacity-0'}`}></div>
      <div style={{ transition: 'opacity 220ms cubic-bezier(.16,1,.3,1), transform 320ms cubic-bezier(.16,1,.3,1)' }} className={`relative bg-white dark:bg-[#182422] rounded-[22px] shadow-2xl w-full ${wide ? 'max-w-2xl' : 'max-w-lg'} max-h-[90vh] overflow-auto border border-slate-200/70 dark:border-slate-700 ${show ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-[.98] translate-y-2'}`}>
        <div className="sticky top-0 bg-white/90 dark:bg-[#182422]/90 glass flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-700 rounded-t-[22px] z-10">
          <h3 className="font-bold text-[15px] tracking-tight">{title}</h3>
          <button onClick={onClose} className="w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-800 grid place-items-center hover:bg-slate-200 dark:hover:bg-slate-700 transition border border-slate-200/60 dark:border-slate-600"><i className="ri-close-line"></i></button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}
function EmptyState({ icon, title, desc, action }) {
  return (
    <div className="flex flex-col items-center justify-center py-14 px-6 text-center border border-dashed border-slate-200 dark:border-slate-700 rounded-[20px] bg-white/60 dark:bg-slate-800/20 backdrop-blur-sm">
      <div className="w-16 h-16 rounded-[18px] bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 grid place-items-center text-2xl mb-4 shadow-soft">{icon}</div>
      <h4 className="font-bold text-[15px]">{title}</h4>
      <p className="text-[13px] text-muted dark:text-slate-400 mt-1.5 max-w-sm leading-relaxed">{desc}</p>
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}
function SectionLabel({ kicker, title, desc }) {
  return (
    <div>
      <div className="inline-flex items-center gap-2 text-[11px] font-bold tracking-widest text-wasla bg-waslaSoft dark:bg-wasla/15 px-2.5 py-1 rounded-full border border-teal-200 dark:border-teal-800">{kicker}</div>
      <h2 className="text-[22px] md:text-[26px] font-bold tracking-tight leading-tight mt-3">{title}</h2>
      {desc && <p className="text-[13px] text-muted dark:text-slate-400 mt-1.5 leading-relaxed max-w-2xl">{desc}</p>}
    </div>
  );
}

// ============ APP ============
function App() {
  const [theme, setTheme] = useState('light');
  const [mode, setMode] = useState('demo'); // demo | live
  const [auth, setAuth] = useState(null); // {role,name}
  const [profileComplete, setProfileComplete] = useState(false);
  const [profileData, setProfileData] = useState(null);
  const [view, setView] = useState('login'); // login | dashboard | myCampaigns | browseInfluencers | browseAdvertisers | exploreCampaigns | profile | messages | campaignDetail
  const [loginRole, setLoginRole] = useState('advertiser');
  const [loginName, setLoginName] = useState('');
  const [loginPass, setLoginPass] = useState('');
  const [loginErr, setLoginErr] = useState({});
  const [toast, setToast] = useState(null);
  const [toastType, setToastType] = useState('info');
  const [campaigns, setCampaigns] = useState(initialCampaigns);
  const [notifOpen, setNotifOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 'n1', text: 'قبل مطعم الملوك دعوتك لحملة "إطلاق منيو الصيف"', time: 'منذ ساعتين', read: false, type: 'accept' },
    { id: 'n2', text: 'لديك دعوة جديدة من مطعم لحظة', time: 'منذ 5 ساعات', read: false, type: 'invite' },
    { id: 'n3', text: 'تم قبول عرضك المعدّل من تقنية بلس', time: 'منذ يوم', read: true, type: 'negotiation' },
    { id: 'n4', text: 'نورة التقنية تقدمت لحملتك "مراجعة سماعات"', time: 'منذ يومين', read: true, type: 'apply' },
  ]);
  const [searchInfluencer, setSearchInfluencer] = useState('');
  const [filterInterest, setFilterInterest] = useState('الكل');
  const [followerRange, setFollowerRange] = useState('الكل');
  const [searchAdvertiser, setSearchAdvertiser] = useState('');
  const [advFilterType, setAdvFilterType] = useState('الكل');
  const [searchCampaign, setSearchCampaign] = useState('');
  const [campFilterStatus, setCampFilterStatus] = useState('الكل');
  const [exploreSearch, setExploreSearch] = useState('');
  const [exploreFilter, setExploreFilter] = useState('الكل');

  // campaign create/edit
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingCampaign, setEditingCampaign] = useState(null);
  const [formCamp, setFormCamp] = useState({ title: '', reels: 0, stories: 0, posts: 0, budget: '', duration: 'أسبوعان', goal: 'زيادة المبيعات' });
  const [formErr, setFormErr] = useState('');

  // invite flows
  const [inviteCampaign, setInviteCampaign] = useState(null); // campaign object when inviting from campaign card
  const [showInviteList, setShowInviteList] = useState(false);
  const [showCampaignPicker, setShowCampaignPicker] = useState(false);
  const [pendingInfluencer, setPendingInfluencer] = useState(null);
  const [pendingPackage, setPendingPackage] = useState(null);
  const [inviteSearch, setInviteSearch] = useState('');
  const [campaignPickerSearch, setCampaignPickerSearch] = useState('');
  const [inviteConfirm, setInviteConfirm] = useState(null); // {inf,camp,pkg}

  // profile view — origin tracking restores true back destination (Phase 0)
  const [viewedAdvertiser, setViewedAdvertiser] = useState(null);
  const [viewedInfluencer, setViewedInfluencer] = useState(null);
  const [profileOrigin, setProfileOrigin] = useState(null); // {view:string, filters?:object}
  const [showProfileCompleteModal, setShowProfileCompleteModal] = useState(false);
  const [profileCompleteReason, setProfileCompleteReason] = useState('');
  // visible-count pagination for §7.5 (full dataset kept, initial 10 visible)
  const [visibleAdvCount, setVisibleAdvCount] = useState(10);
  const [visibleCampCount, setVisibleCampCount] = useState(10);
  const [visibleInfCount, setVisibleInfCount] = useState(10);

  // chat
  const [conversations, setConversations] = useState([
    {
      id: 'conv1', with: 'سارة القحطاني', avatar: 'https://i.pravatar.cc/200?img=5', lastMsg: 'تم الاتفاق — نبدأ العمل الأحد بإذن الله', time: '10:42 ص', unread: 0, role: 'influencer',
      messages: [
        { from: 'them', text: 'مرحبا! سعيدة بدعوتكم لحملة منيو الصيف الجديد', time: '09:15 ص', date: 'اليوم' },
        { from: 'me', text: 'أهلاً سارة، أعجبتنا باقة التفاعل لديك. هل تناسبك تفاصيل الحملة؟', time: '09:20 ص' },
        { from: 'them', text: 'نعم ممتازة، لكن أقترح زيادة الميزانية إلى 5000 مقابل إضافة منشور إضافي', time: '09:25 ص' },
        { from: 'system', cardType: 'negotiation', status: 'pending', original: { reels: 2, stories: 4, posts: 1, budget: 4500, duration: 'أسبوعان' }, proposed: { reels: 2, stories: 4, posts: 2, budget: 5000, duration: 'أسبوعان' }, sender: 'them' },
        { from: 'me', text: 'موافق على التعديل — نعتمد العرض الجديد', time: '10:30 ص' },
        { from: 'system', cardType: 'negotiation', status: 'accepted', original: { reels: 2, stories: 4, posts: 1, budget: 4500, duration: 'أسبوعان' }, proposed: { reels: 2, stories: 4, posts: 2, budget: 5000, duration: 'أسبوعان' }, sender: 'them' },
        { from: 'system', cardType: 'campaign', campaign: { title: 'إطلاق منيو الصيف الجديد', reels: 2, stories: 4, posts: 2, budget: 5000, duration: 'أسبوعان', goal: 'زيادة المبيعات' } },
        { from: 'me', text: 'تم الاتفاق — نبدأ العمل الأحد بإذن الله', time: '10:42 ص' },
      ]
    },
    {
      id: 'conv2', with: 'مطعم لحظة', avatar: '🍔', lastMsg: 'بانتظار ردك على الدعوة', time: 'أمس', unread: 1, role: 'advertiser',
      messages: [
        { from: 'them', text: 'مرحبا نورة! ندعوك لحملة مراجعة السماعات الجديدة', time: 'أمس 03:00 م' },
        { from: 'system', cardType: 'campaign', campaign: { title: 'مراجعة سماعات لاسلكية جديدة', reels: 1, stories: 3, posts: 1, budget: 3500, duration: 'أسبوعان', goal: 'زيادة المتابعين' } },
      ]
    },
    {
      id: 'conv3', with: 'نورة التقنية', avatar: 'https://i.pravatar.cc/200?img=32', lastMsg: 'أرسلت لك عرضاً معدلاً', time: 'أمس', unread: 0, role: 'influencer',
      messages: [
        { from: 'system', cardType: 'negotiation', status: 'pending', original: { reels: 1, stories: 3, posts: 1, budget: 3500, duration: 'أسبوعان' }, proposed: { reels: 1, stories: 2, posts: 1, budget: 4000, duration: 'أسبوعان' }, sender: 'me' },
      ]
    },
  ]);
  const [activeConv, setActiveConv] = useState('conv1');
  const [chatInput, setChatInput] = useState('');
  const [negotiateCard, setNegotiateCard] = useState(null); // {original, conversationId}
  const [showNegotiateEditor, setShowNegotiateEditor] = useState(false);
  const [negoForm, setNegoForm] = useState({ reels: 0, stories: 0, posts: 0, budget: 0, duration: 'أسبوعان' });
  const [detailCamp, setDetailCamp] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [chatMobileList, setChatMobileList] = useState(true);

  const mainRef = useRef(null);
  const headerRef = useRef(null);

  // theme
  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  // scroll reset on view change
  useEffect(() => {
    if (mainRef.current) mainRef.current.scrollTop = 0;
  }, [view]);

  // helpers to store origin before opening a public profile (Phase 0, used in Phase 6/7 for true back)
  const openInfluencerProfile = (inf) => { setProfileOrigin({ view }); setViewedAdvertiser(null); setViewedInfluencer(inf); setView('profile'); };
  const openAdvertiserProfile = (adv) => { setProfileOrigin({ view }); setViewedInfluencer(null); setViewedAdvertiser(adv); setView('profile'); };
  const closeViewedProfile = () => { const dest = profileOrigin?.view || (auth?.role === 'advertiser' ? 'browseAdvertisers' : 'browseInfluencers'); setViewedAdvertiser(null); setViewedInfluencer(null); setProfileOrigin(null); setView(dest); };
  // reset visible counts when filters/search change (Phase 0, used in Phase 2)
  useEffect(() => { setVisibleAdvCount(10); }, [searchAdvertiser, advFilterType]);
  useEffect(() => { setVisibleCampCount(10); }, [exploreSearch, exploreFilter]);
  useEffect(() => { setVisibleInfCount(10); }, [searchInfluencer, filterInterest, followerRange]);
  // default اهتماماتك when influencer opens browse/explore (5.5 final requirement)
  useEffect(() => {
    if (auth?.role === 'influencer' && profileData?.interests?.length) {
      if (view === 'exploreCampaigns' && exploreFilter === 'الكل') setExploreFilter('اهتماماتك');
      if (view === 'browseAdvertisers' && advFilterType === 'الكل') setAdvFilterType('اهتماماتك');
      if (view === 'browseInfluencers' && filterInterest === 'الكل') setFilterInterest('اهتماماتك');
    }
  }, [view]);

  // outside click for dropdowns
  useEffect(() => {
    const h = (e) => {
      if (notifOpen && !e.target.closest('#notif-dropdown') && !e.target.closest('#notif-btn')) setNotifOpen(false);
      if (profileMenuOpen && !e.target.closest('#profile-dropdown') && !e.target.closest('#profile-btn')) setProfileMenuOpen(false);
      if (mobileMenuOpen && !e.target.closest('#mobile-nav') && !e.target.closest('#mobile-btn')) setMobileMenuOpen(false);
    };
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, [notifOpen, profileMenuOpen, mobileMenuOpen]);
  const pushToast6s = (msg, type = 'info') => {
    showToast(msg, type);
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  const showToast = (msg, type = 'info') => { setToast(msg); setToastType(type); };
  const requireProfile = (reason) => {
    if (profileComplete) return true;
    setProfileCompleteReason(reason);
    setShowProfileCompleteModal(true);
    return false;
  };

  // derived lists
  const myCampaigns = useMemo(() => {
    if (mode === 'live' && !profileComplete) return [];
    if (auth?.role === 'advertiser' && mode === 'demo') return campaigns;
    if (auth?.role === 'advertiser' && mode === 'live') return campaigns.filter(c => c.advertiserId === 'me');
    return campaigns;
  }, [campaigns, auth, mode, profileComplete]);

  const ownReputationAccount = mode === 'demo'
    ? (auth?.role === 'advertiser' ? mockAdvertisers[0] : mockInfluencers[0]) : null;

  const filteredInfluencers = useMemo(() => {
    if (mode === 'live') return [];
    const filtered = mockInfluencers.filter(inf => {
      if (searchInfluencer && !inf.name.includes(searchInfluencer) && !getInfHandle(inf).includes(searchInfluencer)) return false;
      if (filterInterest && filterInterest !== 'الكل' && filterInterest !== 'اهتماماتك' && !inf.interests.includes(filterInterest)) return false;
      if (filterInterest === 'اهتماماتك' && profileData?.interests?.length) {
        if (!inf.interests.some(t => profileData.interests.includes(t))) return false;
      }
      const flw = getInfFollowers(inf);
      if (followerRange !== 'الكل') {
        if (followerRange === 'أقل من 50 ألف' && flw >= 50000) return false;
        if (followerRange === '50 - 200 ألف' && (flw < 50000 || flw > 200000)) return false;
        if (followerRange === 'أكثر من 200 ألف' && flw <= 200000) return false;
      }
      return true;
    });
    return auth?.role === 'advertiser' ? rankAccounts(filtered, profileData?.interests || []) : filtered;
  }, [searchInfluencer, filterInterest, followerRange, mode, profileData, auth?.role]);
  const filteredAdvertisers = useMemo(() => {
    if (mode === 'live') return [];
    const filtered = mockAdvertisers.filter(a => {
      if (searchAdvertiser && !a.projectName.includes(searchAdvertiser)) return false;
      if (advFilterType === 'اهتماماتك' && profileData?.interests?.length) {
        if (!a.interests.some(t => profileData.interests.includes(t))) return false;
      } else if (advFilterType !== 'الكل' && advFilterType !== 'اهتماماتك' && a.projectType !== advFilterType) return false;
      return true;
    });
    return auth?.role === 'influencer' ? rankAccounts(filtered, profileData?.interests || []) : filtered;
  }, [searchAdvertiser, advFilterType, mode, profileData, auth?.role]);

  const filteredMyCampaigns = useMemo(() => {
    const base = myCampaigns.filter(c => {
      if (searchCampaign && !c.title.includes(searchCampaign)) return false;
      if (campFilterStatus !== 'الكل' && c.status !== campFilterStatus) return false;
      return true;
    });
    return [...base].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }, [myCampaigns, searchCampaign, campFilterStatus]);

  const exploreCampaigns = useMemo(() => {
    if (mode === 'live') return [];
    const publicStatuses = ['active', 'in_progress', 'completed'];
    const filtered = campaigns.filter(c => {
      if (publicStatuses.length && !publicStatuses.includes(c.status)) return false;
      if (exploreSearch && !c.title.includes(exploreSearch) && !c.advertiserName.includes(exploreSearch)) return false;
      if (exploreFilter === 'اهتماماتك' && profileData?.interests?.length) {
        if (!profileData.interests.includes(c.category)) return false;
      } else if (exploreFilter !== 'الكل' && exploreFilter !== 'اهتماماتك' && c.status !== exploreFilter) return false;
      return true;
    });
    return auth?.role === 'influencer' ? rankCampaigns(filtered, profileData?.interests || [], ownReputationAccount) : filtered;
  }, [campaigns, exploreSearch, exploreFilter, mode, profileData, auth?.role, ownReputationAccount]);

  // actions
  const handleLogin = () => {
    const err = {};
    if (!loginName.trim()) err.name = 'الاسم مطلوب';
    if (!loginPass.trim()) err.pass = 'كلمة المرور مطلوبة';
    else if (loginPass.length < 4) err.pass = 'كلمة المرور قصيرة جداً';
    setLoginErr(err);
    if (Object.keys(err).length) return;
    setAuth({ role: loginRole, name: loginName.trim() });
    setView('dashboard');
    showToast(`مرحباً ${loginName}  تم تسجيل الدخول كـ ${loginRole === 'advertiser' ? 'معلن' : 'مؤثر'}`, 'success');
    if (mode === 'demo') {
      setTimeout(() => { showToast('لديك دعوة جديدة — افتح الإشعارات', 'info'); setNotifications(n => [{ id: 'nx', text: 'دعوة جديدة لحملة "عطر المسك الفاخر"', time: 'الآن', read: false, type: 'invite' }, ...n]); }, 6000);
    }
  };
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const doLogout = () => { setShowLogoutConfirm(false); setAuth(null); setProfileComplete(false); setProfileData(null); setView('login'); setNotifOpen(false); setProfileMenuOpen(false); setViewedAdvertiser(null); setViewedInfluencer(null); setProfileOrigin(null); showToast('تم تسجيل الخروج', 'info'); };
  const handleLogout = () => setShowLogoutConfirm(true);
  const [cancelTarget, setCancelTarget] = useState(null);
  const doCancelCampaign = () => { if (!cancelTarget) return; const c = cancelTarget; setCancelTarget(null); setCampaigns(prev => prev.map(x => x.id === c.id ? { ...x, status: 'cancelled' } : x)); showToast('تم إلغاء الحملة', 'info'); };
  const handleCreateCampaign = () => {
    if (!requireProfile('إنشاء حملة يتطلب إكمال الملف الشخصي للمعلن أولاً.')) return;
    setEditingCampaign(null);
    setFormCamp({ title: '', reels: 0, stories: 0, posts: 0, budget: '', duration: 'أسبوعان', goal: 'زيادة المبيعات' });
    setFormErr('');
    setShowCreateModal(true);
  };
  const handleEditCampaign = (c) => {
    setEditingCampaign(c);
    setFormCamp({ title: c.title, reels: c.reels, stories: c.stories, posts: c.posts, budget: String(c.budget), duration: c.duration, goal: c.goal });
    setFormErr('');
    setShowCreateModal(true);
  };
  const handleSaveCampaign = (asDraft) => {
    if (!formCamp.title.trim()) { setFormErr('اسم الحملة مطلوب'); return; }
    if (formCamp.reels === 0 && formCamp.stories === 0 && formCamp.posts === 0) { setFormErr('يجب تحديد كمية محتوى واحدة على الأقل (ريلز أو ستوري أو منشور)'); return; }
    if (!formCamp.budget || Number(formCamp.budget) <= 0) { setFormErr('الميزانية المقترحة مطلوبة ويجب أن تكون أكبر من صفر'); return; }
    setFormErr('');
    if (editingCampaign) {
      setCampaigns(prev => prev.map(c => c.id === editingCampaign.id ? { ...c, title: formCamp.title, reels: formCamp.reels, stories: formCamp.stories, posts: formCamp.posts, budget: Number(formCamp.budget), duration: formCamp.duration, goal: formCamp.goal, status: asDraft ? 'draft' : 'active' } : c));
      showToast('تم تحديث الحملة بنجاح', 'success');
    } else {
      const nc = { id: 'c' + Date.now(), advertiserId: auth?.role === 'advertiser' ? (mode === 'live' ? 'me' : (mockAdvertisers[0]?.id || 'me')) : 'me', advertiserName: auth?.role === 'advertiser' ? (profileData?.projectName || auth?.name || 'حملتي') : (auth?.name || 'حملتي'), title: formCamp.title, reels: formCamp.reels, stories: formCamp.stories, posts: formCamp.posts, budget: Number(formCamp.budget), duration: formCamp.duration, goal: formCamp.goal, status: asDraft ? 'draft' : 'active', createdAt: new Date().toISOString().slice(0, 10), invites: [] };
      setCampaigns(prev => [nc, ...prev]);
      showToast(asDraft ? 'تم حفظ المسودة' : 'تم إطلاق الحملة بنجاح', 'success');
    }
    setShowCreateModal(false);
  };

  const openInviteFromCampaign = (camp) => {
    if (!requireProfile('دعوة المؤثرين تتطلب إكمال الملف الشخصي أولاً.')) return;
    setInviteCampaign(camp);
    setShowInviteList(true);
  };
  const openInviteFromBrowse = (inf) => {
    if (!requireProfile('إرسال الدعوة يتطلب إكمال الملف الشخصي أولاً.')) return;
    setPendingInfluencer(inf);
    setShowCampaignPicker(true);
  };
  const confirmInvite = (inf, camp) => {
    // add notification — keep picker open until confirm step closes it
    showToast(`تم إرسال الدعوة إلى ${inf.name} لحملة "${camp.title}"`, 'success');
    setShowInviteList(false); setShowCampaignPicker(false); setPendingInfluencer(null); setInviteConfirm(null); setInviteSearch(''); setCampaignPickerSearch('');
    // add conversation
    const newConv = {
      id: 'conv' + Date.now(), with: inf.name, avatar: inf.avatar, lastMsg: `دعوة لحملة "${camp.title}"`, time: 'الآن', unread: 0, role: 'influencer',
      messages: [{ from: 'me', text: `مرحباً ${inf.name} — ندعوك للمشاركة في حملة "${camp.title}"`, time: 'الآن' }, { from: 'system', cardType: 'campaign', campaign: camp }]
    };
    setConversations(prev => [newConv, ...prev]);
    setNotifications(prev => [{ id: 'n' + Date.now(), text: `أرسلت دعوة إلى ${inf.name} لحملة "${camp.title}"`, time: 'الآن', read: false, type: 'invite' }, ...prev]);
  };
  const openPackageFlow = (inf, pkg) => {
    if (!requireProfile('طلب التعاون عبر الباقة يتطلب إكمال الملف الشخصي أولاً.')) return;
    setPendingInfluencer(inf); setPendingPackage(pkg); setShowCampaignPicker(true);
  };
  const confirmPackageRequest = (camp) => {
    showToast(`تم إرسال طلب التعاون عبر باقة "${pendingPackage.name}" لحملة "${camp.title}"`, 'success');
    setShowCampaignPicker(false); setInviteConfirm(null); setInviteSearch(''); setCampaignPickerSearch('');
    const newConv = {
      id: 'conv' + Date.now(), with: pendingInfluencer.name, avatar: pendingInfluencer.avatar, lastMsg: `طلب تعاون عبر باقة ${pendingPackage.name}`, time: 'الآن', unread: 0, role: 'influencer',
      messages: [{ from: 'me', text: `مرحباً ${pendingInfluencer.name} — أرغب بالتعاون عبر باقة "${pendingPackage.name}" لحملة "${camp.title}"`, time: 'الآن' }, { from: 'system', cardType: 'campaign', campaign: camp }]
    };
    setConversations(prev => [newConv, ...prev]);
    setPendingInfluencer(null); setPendingPackage(null);
  };

  const handleApplyToCampaign = (camp) => {
    if (camp.status !== 'active') { showToast('هذه الحملة غير متاحة للتقديم', 'error'); return false; }
    if (!requireProfile('التقديم على الحملات يتطلب إكمال الملف الشخصي للمؤثر أولاً.')) return false;
    showToast(`تم إرسال طلب التقديم لحملة "${camp.title}" — سيتواصل معك المعلن قريباً`, 'success');
    const det = `طلب تعاون: أرغب بالتقديم لحملة "${camp.title}" — ${camp.reels} ريلز / ${camp.posts} بوستات / ${camp.stories} ستوريات — الميزانية ${camp.budget.toLocaleString('ar-EG')} ر.س — ${camp.duration}${camp.desc ? ` — ${camp.desc.slice(0, 120)}` : ''}`;
    const newConv = {
      id: 'conv' + Date.now(), with: camp.advertiserName, avatar: '🏢', lastMsg: `تقدمت لحملة "${camp.title}"`, time: 'الآن', unread: 0, role: 'advertiser',
      messages: [{ from: 'me', text: det, time: 'الآن' }, { from: 'system', cardType: 'campaign', campaign: camp }]
    };
    setConversations(prev => [newConv, ...prev]);
    setNotifications(prev => [{ id: 'n' + Date.now(), text: `تقدمت لحملة "${camp.title}" — بانتظار رد المعلن`, time: 'الآن', read: false, type: 'apply' }, ...prev]);
    return true;
  };

  const handleSendMessage = () => {
    if (!chatInput.trim()) return;
    const conv = conversations.find(c => c.id === activeConv);
    if (!conv) return;
    const msg = { from: 'me', text: chatInput.trim(), time: new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' }) };
    setConversations(prev => prev.map(c => c.id === activeConv ? { ...c, messages: [...c.messages, msg], lastMsg: chatInput.trim() } : c));
    setChatInput('');
    // simulate reply in demo mode
    if (mode === 'demo') {
      setTimeout(() => {
        const replies = ['شكراً لك! سأراجع التفاصيل وأرد عليك قريباً', 'ممتاز — هل يمكننا تعديل الميزانية قليلاً؟', 'تم، بانتظار تأكيدك النهائي'];
        const r = replies[Math.floor(Math.random() * replies.length)];
        setConversations(prev => prev.map(c => c.id === activeConv ? { ...c, messages: [...c.messages, { from: 'them', text: r, time: new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' }) }], lastMsg: r } : c));
      }, 1200);
    }
  };

  const openNegotiate = (original, convId) => {
    setNegoForm({ reels: original.reels, stories: original.stories, posts: original.posts, budget: original.budget, duration: original.duration });
    setNegotiateCard({ original, convId });
    setShowNegotiateEditor(true);
  };
  const sendCounterOffer = () => {
    if (negoForm.reels === 0 && negoForm.stories === 0 && negoForm.posts === 0) { showToast('يجب تحديد كمية محتوى واحدة على الأقل', 'error'); return; }
    if (!negoForm.budget || Number(negoForm.budget) <= 0) { showToast('الميزانية مطلوبة', 'error'); return; }
    const proposed = { ...negoForm, budget: Number(negoForm.budget) };
    setConversations(prev => prev.map(c => c.id === negotiateCard.convId ? { ...c, messages: [...c.messages, { from: 'system', cardType: 'negotiation', status: 'pending', original: negotiateCard.original, proposed, sender: 'me' }], lastMsg: 'أرسلت عرضاً معدلاً' } : c));
    setShowNegotiateEditor(false); setNegotiateCard(null);
    showToast('تم إرسال العرض المعدّل — سيظهر كبطاقة في المحادثة', 'success');
    // simulate recipient view: after a bit, simulate accept/reject? keep pending
  };
  const handleNegotiationAction = (convId, msgIdx, action) => {
    setConversations(prev => prev.map(c => {
      if (c.id !== convId) return c;
      const msgs = [...c.messages];
      const m = msgs[msgIdx];
      if (action === 'accept') msgs[msgIdx] = { ...m, status: 'accepted' };
      if (action === 'reject') msgs[msgIdx] = { ...m, status: 'rejected' };
      if (action === 'cancel') msgs[msgIdx] = { ...m, status: 'cancelled' };
      // add system text
      let lastMsg = c.lastMsg;
      if (action === 'accept') { msgs.push({ from: 'system', cardType: 'campaign', campaign: { title: 'تم الاتفاق — تفاصيل الحملة', reels: m.proposed.reels, stories: m.proposed.stories, posts: m.proposed.posts, budget: m.proposed.budget, duration: m.proposed.duration, goal: '—' } }); lastMsg = 'تم قبول العرض'; }
      if (action === 'reject') lastMsg = 'تم رفض العرض';
      if (action === 'cancel') lastMsg = 'تم إلغاء العرض';
      return { ...c, messages: msgs, lastMsg };
    }));
    const labels = { accept: 'تم قبول العرض', reject: 'تم رفض العرض', cancel: 'تم إلغاء العرض' };
    showToast(labels[action] || 'تم التحديث', 'success');
  };

  // ============ RENDER HELPERS ============
  const navItems = useMemo(() => {
    if (!auth) return [];
    const base = [
      { id: 'dashboard', label: 'لوحة التحكم', icon: 'ri-dashboard-line' },
      ...(auth.role === 'advertiser' ? [{ id: 'myCampaigns', label: 'حملاتي', icon: 'ri-megaphone-line' }] : []),
      { id: 'exploreCampaigns', label: 'استكشاف الحملات', icon: 'ri-compass-3-line' },
      { id: 'browseInfluencers', label: 'تصفح المؤثرين', icon: 'ri-star-line' },
      { id: 'browseAdvertisers', label: 'تصفح المعلنين', icon: 'ri-store-2-line' },
      { id: 'messages', label: 'الرسائل', icon: 'ri-chat-3-line', badge: conversations.reduce((a, c) => a + c.unread, 0) || null },
    ];
    return base;
  }, [auth, conversations]);

  if (view === 'login') {
    return (
      <div className={`${theme === 'dark' ? 'dark' : ''}`}>
        <div className={`min-h-screen flex flex-col ${theme === 'dark' ? 'bg-[#101918]' : 'bg-sand'}`}>
          {/* subtle paper grain */}
          <div className="fixed inset-0 pointer-events-none opacity-[.035]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E")` }}></div>

          <div className="flex-1 flex items-center justify-center p-4 md:p-6 relative">
            <div className="w-full max-w-[1080px] grid md:grid-cols-[1.08fr_0.92fr] gap-5 md:gap-6 items-stretch">
              {/* ——— editorial brand pane ——— */}
              <div className="hidden md:flex flex-col justify-between rounded-[28px] p-8 lg:p-9 relative overflow-hidden text-white view-enter" style={{ background: 'linear-gradient(145deg, #123D35 0%, #0F766E 100%)' }}>
                {/* mesh aura */}




                <div className="relative">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-2xl bg-white text-wasla grid place-items-center text-[20px] font-bold shadow-lg">و</div>
                    <div>
                      <div className="font-bold text-[18px] tracking-tight leading-none">وصلة</div>
                      <div className="text-[10px] tracking-[.18em] text-white/75 font-bold">WASLA</div>
                    </div>
                    <span className="ms-1 text-[10px] font-bold tracking-widest bg-white/15 border border-white/20 rounded-full px-2.5 py-1 backdrop-blur">منصة وصل</span>
                  </div>
                  <p className="text-white/85 text-[12px] mt-2.5 leading-relaxed max-w-[28ch]">نصل المعلن بالمؤثر المناسب — بتفاوض واضح، وباقات شفافة، وأثر يُقاس.</p>
                </div>

                <div className="relative">
                  <div className="inline-flex items-center gap-1.5 bg-white/14 backdrop-blur border border-white/15 rounded-full px-3 py-1.5 text-[11px] font-bold">
                    <span className="w-2 h-2 rounded-full bg-emerald-300 animate-pulse"></span> سوق حي — بيانات تجريبية للعرض
                  </div>
                  <h2 className="text-[30px] lg:text-[34px] font-bold leading-[1.05] tracking-tight mt-4">
                    سوق<br />يُقرّب المسافات<br /><span className="text-white/90 font-bold">بين الفكرة والجمهور</span>
                  </h2>
                  <p className="text-white/82 text-[13px] leading-relaxed mt-3.5 max-w-[36ch]">اعرض حملتك، اختر من يمثّل ذوق جمهورك، وتفاوض على السعر والمحتوى في مكان واحد صُمّم للسوق المحلي.</p>

                  <div className="grid grid-cols-3 gap-2.5 mt-6">
                    {[
                      { v: '+٣٠٠', k: 'حملة تجريبية', icon: 'ri-megaphone-line' },
                      { v: '+١٢٠', k: 'مؤثر موثق', icon: 'ri-verified-badge-line' },
                      { v: '٤.٩', k: 'رضا تجريبي', icon: 'ri-star-smile-line' },
                    ].map(s => (
                      <div key={s.k} className="bg-white/12 backdrop-blur-xl border border-white/14 rounded-2xl p-3">
                        <div className="w-7 h-7 rounded-full bg-white/16 grid place-items-center text-[13px]"><i className={s.icon}></i></div>
                        <div className="text-[17px] font-bold mt-2 leading-none">{s.v}</div>
                        <div className="text-[11px] text-white/75 font-bold mt-1">{s.k}</div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-5 flex items-center gap-2 text-[11px] text-white/70 font-bold">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 inline-block"></span> نموذج أولي للمقابلات — لا دفع حقيقي
                    <span className="ms-auto hidden lg:inline-flex items-center gap-1 opacity-70"><i className="ri-shield-check-line"></i> تجربة آمنة</span>
                  </div>
                </div>

                {/* floating preview card */}
                {/*
              <div className="hidden lg:block absolute bottom-6 left-6 right-6">
                <div className="bg-white text-ink rounded-[18px] p-3.5 shadow-glass border border-white/60 flex items-center gap-3 view-enter stagger-2">
                  <img src="https://i.pravatar.cc/200?img=5" className="w-10 h-10 rounded-full object-cover shrink-0" alt=""/>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-bold">سارة القحطاني • <span className="text-muted font-bold">١٨٤ ألف متابع</span></div>
                    <div className="text-[11px] text-muted mt-0.5 truncate">باقة التفاعل — ٢ ريلز + ٤ ستوري + منشور</div>
                  </div>
                  <span className="text-[11px] font-bold bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-full border border-emerald-200 shrink-0">٣٢٠٠ ر.س</span>
                </div>
              </div>
              */}

              </div>

              {/* ——— form pane ——— */}
              <div className="bg-white dark:bg-[#101918] rounded-[28px] shadow-soft border border-slate-200/70 dark:border-slate-700/60 p-6 md:p-7 lg:p-8 flex flex-col view-enter stagger-1 relative overflow-hidden">
                <div className="absolute -top-24 -left-24 w-72 h-72 bg-wasla/8 rounded-full blur-3xl pointer-events-none"></div>
                <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-amber-200/20 rounded-full blur-3xl pointer-events-none dark:bg-amber-400/10"></div>

                <div className="relative flex items-center justify-between">
                  <div className="flex items-center gap-2.5 md:hidden">
                    <div className="w-9 h-9 rounded-xl bg-wasla text-white grid place-items-center font-bold">و</div>
                    <span className="font-bold text-[16px]">وصلة</span>
                    <span className="text-[10px] font-bold text-muted tracking-widest">WASLA</span>
                  </div>
                  <div className="flex items-center gap-2 ms-auto">
                    <span className="hidden sm:inline-flex text-[11px] font-bold text-muted bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-full border border-slate-200/60 dark:border-slate-700">{mode === 'demo' ? 'وضع العرض' : 'الوضع الحي'}</span>
                    <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')} className="w-9 h-9 rounded-full border border-slate-200 dark:border-slate-600 grid place-items-center hover:bg-slate-50 dark:hover:bg-slate-800 transition focus-ring bg-white dark:bg-slate-800"><i className={theme === 'light' ? 'ri-moon-line' : 'ri-sun-line'}></i></button>
                  </div>
                </div>

                <div className="relative mt-4 bg-slate-100 dark:bg-slate-800 rounded-full p-1 flex text-[13px] font-bold">
                  <button onClick={() => setMode('demo')} className={`flex-1 py-2.5 rounded-full transition-all duration-300 ${mode === 'demo' ? 'bg-white dark:bg-slate-700 shadow-soft text-wasla dark:text-white' : 'text-muted hover:text-ink dark:hover:text-white'}`}>وضع العرض</button>
                  <button onClick={() => setMode('live')} className={`flex-1 py-2.5 rounded-full transition-all duration-300 ${mode === 'live' ? 'bg-white dark:bg-slate-700 shadow-soft text-wasla dark:text-white' : 'text-muted hover:text-ink dark:hover:text-white'}`}>الوضع الحي</button>
                </div>
                {/* <p className="relative text-[11px] text-muted dark:text-slate-400 mt-2.5 text-center leading-relaxed">{mode==='demo'?'بيانات تجريبية واقعية + محاكاة ردود محلية':'منصة فارغة لجمع بيانات حقيقية — مطابقة يدوية لاحقاً'}</p> */}

                <h1 className="relative font-bold text-[19px] tracking-tight mt-6">تسجيل الدخول / إنشاء حساب</h1>
                <p className="relative text-[13px] text-muted dark:text-slate-400 mt-1 leading-relaxed">اختر دورك ثم أدخل بياناتك — ستدخل المنصة حتى لو لم تكمل ملفك الشخصي.</p>

                <div className="relative grid grid-cols-2 gap-3 mt-5">
                  {[
                    { id: 'advertiser', label: 'معلن', sub: 'صاحب مشروع أو متجر', icon: 'ri-store-2-line', grad: 'from-wasla to-teal-600' },
                    { id: 'influencer', label: 'مؤثر', sub: 'صانع محتوى', icon: 'ri-quill-pen-line', grad: 'from-emerald-500 to-teal-400' },
                  ].map(r => {
                    const active = loginRole === r.id;
                    return (
                      <button key={r.id} onClick={() => setLoginRole(r.id)} className={`p-4 rounded-[18px] border-2 text-start transition-all duration-300 text-start ${active ? 'border-wasla bg-waslaSoft dark:bg-wasla/15 shadow-soft' : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 bg-white dark:bg-slate-800/50'}`}>
                        <div className={`w-10 h-10 rounded-xl grid place-items-center text-white shadow ${active ? `bg-gradient-to-br ${r.grad}` : 'bg-slate-900 dark:bg-slate-700'}`}><i className={r.icon}></i></div>
                        <div className="font-bold text-[13px] mt-2.5">{r.label}</div>
                        <div className="text-[11px] text-muted font-bold mt-0.5">{r.sub}</div>
                        {active && <div className="mt-2 text-[11px] font-bold text-wasla flex items-center gap-1"><i className="ri-check-line"></i> محدد</div>}
                      </button>
                    );
                  })}
                </div>

                <label className="relative text-xs font-bold mt-5 block">الاسم <span className="text-red-500">*</span></label>
                <input value={loginName} onChange={e => setLoginName(e.target.value)} placeholder={loginRole === 'advertiser' ? 'مثال: متجر أناقة العروس' : 'مثال: سارة القحطاني'} className={`relative mt-1.5 w-full rounded-2xl border px-4 py-3.5 text-[13px] outline-none focus-ring bg-white dark:bg-slate-800 transition ${loginErr.name ? 'border-red-400 bg-red-50/40 dark:bg-red-900/10' : 'border-slate-200 dark:border-slate-600 focus:border-wasla'}`} />
                {loginErr.name && <span className="text-[11px] text-red-600 mt-1.5 font-bold">{loginErr.name}</span>}

                <label className="relative text-xs font-bold mt-4 block">كلمة المرور <span className="text-red-500">*</span></label>
                <input type="password" value={loginPass} onChange={e => setLoginPass(e.target.value)} placeholder="••••••••" className={`relative mt-1.5 w-full rounded-2xl border px-4 py-3.5 text-[13px] outline-none focus-ring bg-white dark:bg-slate-800 transition ${loginErr.pass ? 'border-red-400 bg-red-50/40 dark:bg-red-900/10' : 'border-slate-200 dark:border-slate-600 focus:border-wasla'}`} />
                {loginErr.pass && <span className="text-[11px] text-red-600 mt-1.5 font-bold">{loginErr.pass}</span>}

                <div className="relative grid grid-cols-2 gap-3 mt-6">
                  <button onClick={handleLogin} className="btn-primary py-3.5 rounded-2xl bg-wasla hover:bg-waslaHover text-white font-bold text-[13px] shadow-glass">دخول</button>
                  <button onClick={handleLogin} className="py-3.5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 font-bold text-[13px] hover:bg-slate-50 dark:hover:bg-slate-700 transition">إنشاء حساب</button>
                </div>
                {/* <p className="relative text-[11px] text-muted text-center mt-3 font-bold">نموذج محلي — لا يوجد تحقق حقيقي أو دفع.</p> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ============ MAIN SHELL ============
  return (
    <div className={`h-screen flex flex-col ${theme === 'dark' ? 'dark' : ''}`}>
      <div className="flex-1 flex flex-col min-h-0 bg-sand dark:bg-sandDark relative">
        {/* soft ambient wash */}




        {/* HEADER — glass — dir ltr keeps logo physical left / hamburger physical right (2.1) */}
        <header dir="ltr" ref={headerRef} className="h-[64px] shrink-0 glass bg-white/80 dark:bg-[#101918]/70 border-b border-slate-200/60 dark:border-slate-700/50 flex items-center px-4 lg:px-6 gap-3 sticky top-0 z-30 backdrop-blur-xl">
          {/* brand — inner rtl so Arabic stays bidi-correct inside ltr header */}


          {/* desktop nav — pill */}
          <nav className="hidden lg:flex items-center gap-1 flex-1 justify-center">
            <div className="flex items-center gap-1 p-1 rounded-full bg-slate-100/80 dark:bg-slate-800/60 border border-slate-200/50 dark:border-slate-700/50">
              {navItems.map(it => {
                const active = view === it.id;
                return (
                  <button key={it.id} onClick={() => setView(it.id)} className={`px-3.5 py-1.5 rounded-full text-[13px] font-bold flex items-center gap-1.5 whitespace-nowrap transition-all duration-200 ${active ? 'bg-white dark:bg-[#20302D] text-wasla shadow-soft border border-slate-200/60 dark:border-slate-600' : 'text-muted dark:text-slate-300 hover:text-ink dark:hover:text-white hover:bg-white/60 dark:hover:bg-slate-700/50'}`}>
                    <i className={it.icon}></i> {it.label}
                    {it.badge ? <span className="bg-red-500 text-white text-[10px] min-w-[18px] h-[18px] rounded-full grid place-items-center px-1 font-bold animate-pulse">{it.badge}</span> : null}
                  </button>
                );
              })}
            </div>
          </nav>

          <div className="flex items-center gap-2 justify-start flex-1 lg:flex-none lg:ms-auto">
            {/* inner rtl keeps text arabic-bidi while ltr hestartader holds physical order */}
            <div dir="rtl" className="flex items-center gap-2">
              {/* mode */}
              <div className="hidden md:flex items-center gap-1.5 bg-white dark:bg-slate-800 rounded-full p-1 border border-slate-200/60 dark:border-slate-700">
                <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full border transition ${mode === 'demo' ? 'bg-waslaSoft text-wasla border-teal-200 dark:bg-wasla/15 dark:text-teal-300 dark:border-teal-800' : 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/20 dark:text-emerald-300 dark:border-emerald-800'}`}>{mode === 'demo' ? 'وضع العرض' : 'الوضع الحي'}</span>
                <button onClick={() => setMode(mode === 'demo' ? 'live' : 'demo')} className="text-[11px] font-bold px-3 py-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 transition">تبديل</button>
              </div>

              {/* <button onClick={()=>setTheme(theme==='light'?'dark':'light')} className="w-9 h-9 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 grid place-items-center hover:bg-slate-50 dark:hover:bg-slate-700 shrink-0 transition focus-ring">
            <i className={theme==='light'?'ri-moon-line':'ri-sun-line'}></i>
          </button> */}

              {/* notifications */}
              <div className="relative">
                <button id="notif-btn" onClick={() => setNotifOpen(!notifOpen)} className="w-9 h-9 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 grid place-items-center hover:bg-slate-50 dark:hover:bg-slate-700 relative transition focus-ring">
                  <i className="ri-notification-3-line"></i>
                  {unreadCount > 0 && <span style={{ animation: 'pulseRing 1.8s infinite' }} className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] min-w-[18px] h-[18px] rounded-full grid place-items-center px-1 font-bold border-2 border-white dark:border-slate-800">{unreadCount}</span>}
                </button>
                {notifOpen && (
                  <div id="notif-dropdown" style={{ animation: 'enterScale .22s cubic-bezier(.16,1,.3,1) both' }} className="absolute left-0 mt-3 w-80 bg-white dark:bg-[#182422] rounded-[18px] shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden z-40">
                    <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100 dark:border-slate-700">
                      <span className="font-bold text-sm">الإشعارات</span>
                      <button onClick={() => setNotifications(prev => prev.map(n => ({ ...n, read: true })))} className="text-xs text-wasla font-bold hover:underline">تحديد الكل كمقروء</button>
                    </div>
                    <div className="max-h-80 overflow-auto">
                      {notifications.length === 0 ? <div className="p-8 text-center text-sm text-muted">لا توجد إشعارات</div> :
                        notifications.map(n => (
                          <div key={n.id} className={`px-4 py-3 flex gap-3 border-b border-slate-50 dark:border-slate-700/50 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition ${!n.read ? 'bg-waslaSoft/50 dark:bg-wasla/10' : ''}`}>
                            <div className={`w-9 h-9 rounded-full grid place-items-center shrink-0 text-sm border ${n.type === 'invite' ? 'bg-waslaSoft text-wasla border-teal-200' : n.type === 'accept' ? 'bg-emerald-50 text-emerald-600 border-emerald-200' : 'bg-amber-50 text-amber-600 border-amber-200'}`}><i className={n.type === 'invite' ? 'ri-mail-send-line' : n.type === 'accept' ? 'ri-checkbox-circle-line' : 'ri-exchange-line'}></i></div>
                            <div className="flex-1">
                              <p className="text-[13px] leading-relaxed font-bold">{n.text}</p>
                              <p className="text-[11px] text-muted mt-1">{n.time}</p>
                            </div>
                            {!n.read && <span className="w-2 h-2 rounded-full bg-wasla shrink-0 mt-2"></span>}
                          </div>
                        ))
                      }
                    </div>
                  </div>
                )}
              </div>

              {/* profile */}
              {/* <div className="relative">
            <button id="profile-btn" onClick={()=>setProfileMenuOpen(!profileMenuOpen)} className="flex items-center gap-2 ps-1 pe-2.5 py-1 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700 transition focus-ring">
              <img src={auth?.role==='influencer' ? 'https://i.pravatar.cc/200?img=5' : 'https://i.pravatar.cc/200?img=14'} className="w-7 h-7 rounded-full object-cover" alt=""/>
              <span className="hidden sm:block text-[13px] font-bold max-w-[100px] truncate">{auth?.name}</span>
              <span className={`hidden sm:inline text-[10px] px-2 py-0.5 rounded-full font-bold border ${auth?.role==='advertiser'?'bg-waslaSoft text-wasla border-teal-200 dark:bg-wasla/15 dark:text-teal-300':'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/20 dark:text-emerald-300'}`}>{auth?.role==='advertiser'?'معلن':'مؤثر'}</span>
              <i className="ri-arrow-down-s-line text-slate-400 text-sm"></i>
            </button>
            {profileMenuOpen && (
              <div id="profile-dropdown" style={{animation:'enterScale .2s cubic-bezier(.16,1,.3,1) both'}} className="absolute left-0 mt-3 w-60 bg-white dark:bg-[#182422] rounded-[18px] shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden z-40">
                <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/30">
                  <div className="font-bold text-sm">{auth?.name}</div>
                  <div className="text-xs text-muted mt-0.5">{auth?.role==='advertiser'?'حساب معلن':'حساب مؤثر'} {profileComplete?'• مكتمل ✓':'• غير مكتمل'}</div>
                </div>
                <button onClick={()=>{setView('profile'); setProfileMenuOpen(false);}} className="w-full text-start px-4 py-3 text-[13px] font-bold hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-2"><i className="ri-user-line"></i> ملفي الشخصي</button>
                <button onClick={handleLogout} className="w-full text-start px-4 py-3 text-[13px] font-bold hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 flex items-center gap-2"><i className="ri-logout-box-line"></i> تسجيل الخروج</button>
              </div>
            )}
          </div> */}
            </div>

            {/* mobile menu btn — physical right via ltr header (2.1) 516 */}
            <button onClick={() => { setViewedAdvertiser(null); setViewedInfluencer(null); setView('messages'); }} aria-label="الرسائل" aria-current={view === 'messages' ? 'page' : undefined} className={`lg:hidden relative w-9 h-9 rounded-full border grid place-items-center shrink-0 transition focus-ring ${view === 'messages' ? 'bg-waslaSoft text-wasla border-teal-200 dark:bg-wasla/20 dark:border-teal-800' : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-600'}`}>
              <i className="ri-chat-3-line"></i>
              {conversations.reduce((a, c) => a + c.unread, 0) > 0 && <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] min-w-[18px] h-[18px] rounded-full grid place-items-center px-1 font-bold border-2 border-white dark:border-slate-800">{conversations.reduce((a, c) => a + c.unread, 0)}</span>}
            </button>
          </div>

          <div dir="rtl" className="flex items-center gap-3 shrink-0">
            <div className="w-9 h-9 rounded-xl bg-wasla text-white grid place-items-center font-bold text-lg shadow-glass pb-2 ">و</div>
            <div className="hidden sm:block leading-none ">
              <div className="font-bold text-[15px] tracking-tight">وصلة</div>
              <div className="text-[9px] tracking-[.18em] text-muted dark:text-slate-400 font-bold">WASLA</div>
            </div>
            <span className="hidden lg:inline-flex items-center gap-1 text-[10px] font-bold px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 dark:bg-amber-900/25 dark:text-amber-300 border border-amber-200/70 dark:border-amber-800"> <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span> نموذج أولي</span>
            <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')} className="w-9 h-9 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 grid place-items-center hover:bg-slate-50 dark:hover:bg-slate-700 shrink-0 transition focus-ring">
              <i className={theme === 'light' ? 'ri-moon-line' : 'ri-sun-line'}></i>
            </button>
          </div>
        </header>












        {/* MAIN */}
        <main ref={mainRef} className="flex-1 overflow-auto relative wasla-main">
          <div className="max-w-[1280px] mx-auto px-4 lg:px-6 py-6 relative">

            {/* DASHBOARD */}
            {view === 'dashboard' && (
              <div className="view-enter">
                {/* top bar */}
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <h1 className="text-[22px] md:text-[26px] font-bold tracking-tight leading-tight">مرحباً {auth?.name}
                      {/* <span className="inline-block" style={{animation:'blobDrift 5s ease-in-out infinite'}}>👋</span> */}
                    </h1>
                    <p className="text-[13px] text-muted dark:text-slate-400 mt-1.5 leading-relaxed max-w-xl">{auth?.role === 'advertiser' ? 'تابع حملاتك وتواصل مع المؤثرين المناسبين لعلامتك.' : 'اكتشف الحملات المناسبة لاهتماماتك وتواصل مع المعلنين.'}</p>
                    {!profileComplete && (
                      <div className="mt-3 inline-flex items-center gap-2 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-300 px-3 py-2 rounded-xl text-xs font-bold">
                        <i className="ri-alert-line"></i> ملفك الشخصي غير مكتمل — يمكنك التصفح، لكن بعض الإجراءات تتطلب الإكمال.
                        <button onClick={() => setView('profile')} className="bg-amber-600 text-white px-3 py-1 rounded-full hover:bg-amber-700">إكمال الملف</button>
                      </div>
                    )}
                  </div>
                  {auth?.role === 'advertiser' && (
                    <button onClick={handleCreateCampaign} className="bg-wasla hover:bg-waslaHover text-white px-5 py-3 btn-primary rounded-xl font-bold text-sm shadow flex items-center gap-2"><i className="ri-add-line"></i> إنشاء حملة جديدة</button>
                  )}
                </div>

                {/* summary cards — merged per 5.1/11.1 */}
                {auth?.role === 'influencer' ? (
                  <button onClick={() => setView('exploreCampaigns')} className="w-full text-start bg-white dark:bg-[#182422] rounded-[18px] border border-slate-200/60 dark:border-slate-700/60 px-5 py-3 shadow-soft card-premium hover:shadow-softHover transition flex items-center justify-between mt-4 ">
                    <div>

                      <div className="text-xs font-bold text-slate-500 ">الحملات</div>

                      <div className="text-l font-bold mt-1 ">الحملات النشطة = {mode === 'live' && !profileComplete ? 0 : campaigns.filter(c => c.status === 'active').length} </div>

                      <div className="text-l font-bold -mt-1 ">إجمالي الحملات= {mode === 'live' && !profileComplete ? 0 : campaigns.length} </div>


                      {/* <div className="text-2xl font-bold mt-1">{mode==='live'&&!profileComplete?0:campaigns.filter(c=>c.status==='active').length} 
                      <span className="text-sm text-muted">
                         • 
                        </span>
                        {mode==='live'&&!profileComplete?0:campaigns.length}</div> */}
                      <div className="text-[11px] text-wasla font-bold mt-2 flex items-center gap-1  ">
                        <i className="ri-compass-3-line"></i> استكشاف الحملات</div>
                    </div>
                    <div className="w-11 h-11 rounded-xl bg-waslaSoft dark:bg-wasla/15 text-wasla grid place-items-center text-xl shrink-0"><i className="ri-compass-3-line"></i></div>
                  </button>
                ) : (
                  <button onClick={() => setView('myCampaigns')} className="w-full text-start bg-white dark:bg-[#182422] rounded-[18px] border border-slate-200/60 dark:border-slate-700/60 p-5 shadow-soft card-premium hover:shadow-softHover transition flex items-center justify-between mt-5">
                    <div>
                      <div className="text-xs font-bold text-slate-500">حملاتي — إجمالي • نشطة</div>
                      <div className="text-2xl font-bold mt-1">{myCampaigns.length} <span className="text-sm text-muted">•</span> {myCampaigns.filter(c => c.status === 'active').length} <span className="text-sm text-emerald-600">نشطة</span></div>
                      <div className="text-[11px] text-wasla font-bold mt-1 flex items-center gap-1"><i className="ri-arrow-left-line"></i> إدارة حملاتي</div>
                    </div>
                    <div className="w-11 h-11 rounded-xl bg-waslaSoft dark:bg-wasla/15 text-wasla grid place-items-center text-xl shrink-0"><i className="ri-megaphone-line"></i></div>
                  </button>
                )}

                <div className="grid lg:grid-cols-[1.7fr_1fr] gap-4 mt-4">
                  {/* recent activity + recent campaigns */}
                  <div className="space-y-4">
                    <div className="bg-white dark:bg-[#182422] rounded-[18px] border border-slate-200/60 dark:border-slate-700/60 p-5 shadow-soft card-premium">
                      <div className="flex items-center justify-between">
                        <h3 className="font-bold">النشاط الأخير</h3>
                        <span className="text-[11px] bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded-full">آخر 7 أيام</span>
                      </div>
                      {mode === 'live' ? (
                        <EmptyState icon="📭" title="لا يوجد نشاط بعد" desc="سيظهر هنا تفاعل حملاتك ودعواتك بمجرد إنشاء أول حملة." />
                      ) : auth?.role === 'influencer' ? (
                        <div className="mt-4 space-y-3">
                          {[
                            { icon: 'ri-send-plane-line', color: 'text-teal-600 bg-teal-50', title: 'تقدمت لحملة', desc: 'حملة "مراجعة سماعات لاسلكية جديدة" • منذ ساعتين' },
                            { icon: 'ri-checkbox-circle-line', color: 'text-emerald-600 bg-emerald-50', title: 'تم قبول طلبك', desc: 'حملة "إطلاق مجموعة مكياج العيد" • منذ 5 ساعات' },
                            { icon: 'ri-exchange-line', color: 'text-amber-600 bg-amber-50', title: 'عرض تفاوضي مرسل', desc: 'حملة "عطر المسك الفاخر" • منذ يوم' },
                          ].map((a, i) => (
                            <div key={i} className="flex gap-3 p-3 rounded-xl border border-slate-100 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/30">
                              <div className={`w-9 h-9 rounded-full grid place-items-center shrink-0 ${a.color}`}><i className={a.icon}></i></div>
                              <div className="flex-1">
                                <div className="text-sm font-bold leading-none">{a.title}</div>
                                <div className="text-xs text-slate-500 mt-1">{a.desc}</div>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="mt-4 space-y-3">
                          {[
                            { icon: 'ri-checkbox-circle-line', color: 'text-emerald-600 bg-emerald-50', title: 'قبلت سارة القحطاني دعوتك', time: 'منذ ساعتين', desc: 'حملة "إطلاق منيو الصيف الجديد"' },
                            { icon: 'ri-mail-send-line', color: 'text-teal-600 bg-teal-50', title: 'أرسلت دعوة إلى نورة التقنية', time: 'منذ 5 ساعات', desc: 'حملة "مراجعة سماعات لاسلكية"' },
                            { icon: 'ri-user-add-line', color: 'text-amber-600 bg-amber-50', title: 'تقدم أحمد جيمز لحملتك', time: 'منذ يوم', desc: 'حملة "تحدي 30 يوم لياقة"' },
                          ].map((a, i) => (
                            <div key={i} className="flex gap-3 p-3 rounded-xl border border-slate-100 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/30">
                              <div className={`w-9 h-9 rounded-full grid place-items-center shrink-0 ${a.color}`}><i className={a.icon}></i></div>
                              <div className="flex-1">
                                <div className="text-sm font-bold leading-none">{a.title}</div>
                                <div className="text-xs text-slate-500 mt-1">{a.desc} • {a.time}</div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="bg-white dark:bg-[#182422] rounded-[18px] border border-slate-200/60 dark:border-slate-700/60 p-5 shadow-soft card-premium">
                      <div className="flex items-center justify-between">
                        <h3 className="font-bold">{auth?.role === 'advertiser' ? 'أحدث حملاتك' : 'حملات مقترحة لك'}</h3>
                        <button onClick={() => { if (auth?.role === 'advertiser') setView('myCampaigns'); else { if (profileData?.interests?.length) setExploreFilter('اهتماماتك'); setView('exploreCampaigns'); } }} className="text-xs font-bold text-wasla hover:underline">عرض الكل</button>
                      </div>
                      <div className="grid sm:grid-cols-2 gap-3 mt-4">
                        {(() => {
                          const src = auth?.role === 'advertiser' ? [...myCampaigns].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 2) : (() => { const interests = (profileData?.interests || []); const acts = mode === 'demo' ? campaigns.filter(c => c.status === 'active') : []; if (interests.length) { const matched = acts.filter(c => interests.includes(c.category)); if (matched.length) return rankCampaigns(matched, interests, ownReputationAccount).slice(0, 2); } return rankCampaigns(acts, interests, ownReputationAccount).slice(0, 2); })();
                          const isFallback = auth?.role !== 'advertiser' && (profileData?.interests || []).length > 0 && src.length > 0 && !src.some(c => (profileData.interests || []).includes(c.category));
                          return (
                            <>
                              {isFallback && <div className="col-span-2 text-[11px] font-bold text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl px-3 py-2">اقتراحات أخرى — لا توجد مطابقة مباشرة لاهتماماتك</div>}
                              {src.map(c => (
                                <div key={c.id} className="rounded-[16px] border border-slate-200/60 dark:border-slate-700/60 p-4 bg-white dark:bg-[#1e302e] shadow-soft card-premium overflow-hidden relative flex flex-col">
                                  <div className="absolute top-0 inset-x-0 h-[3px] bg-gradient-to-r from-wasla via-teal-400 to-amber-300 opacity-80"></div>
                                  <div className="flex items-center justify-between"><span className="text-xs font-bold text-slate-500">{c.advertiserName}</span><Badge status={c.status} /></div>
                                  {auth?.role === 'influencer' && <ReputationSummary account={getCampaignAdvertiser(c, ownReputationAccount)} mode={mode} compact />}
                                  <div className="font-bold text-sm mt-2 leading-snug">{c.title}</div>
                                  <div className="flex gap-2 mt-3 text-[11px] font-bold">
                                    <span className="bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded-full">{c.reels} ريلز</span>
                                    <span className="bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded-full">{c.stories} ستوري</span>
                                    <span className="bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded-full">{c.posts} منشور</span>
                                  </div>
                                  <div className="flex items-center justify-between mt-3">
                                    <span className="text-sm font-bold text-wasla">{c.budget.toLocaleString('ar-EG')} ر.س</span>
                                    <span className="text-xs text-slate-500">{c.duration}</span>
                                  </div>
                                  <button onClick={() => { setDetailCamp(c); setShowDetailModal(true); }} className="w-full mt-3 py-2 rounded-xl border border-slate-200 dark:border-slate-600 text-xs font-bold hover:bg-slate-50 dark:hover:bg-slate-800">عرض التفاصيل</button>
                                </div>
                              ))}
                            </>
                          );
                        })()}
                      </div>
                    </div>
                  </div>

                  {/* suitable */}
                  <div className="bg-white dark:bg-[#182422] rounded-[18px] border border-slate-200/60 dark:border-slate-700/60 p-5 shadow-soft card-premium">
                    <h3 className="font-bold">{auth?.role === 'advertiser' ? 'مؤثرون مناسبون لعلامتك' : 'معلنون يطابقون اهتماماتك'}</h3>
                    <p className="text-xs text-slate-500 mt-1">{auth?.role === 'advertiser' ? 'بناءً على مجال مطعمك واهتماماتك' : 'بناءً على اهتماماتك ومجالك'}</p>
                    <div className="mt-4 space-y-3">
                      {(() => {
                        if (auth?.role === 'advertiser') {
                          const interests = profileData?.interests?.length ? profileData.interests : (mode === 'demo' ? mockAdvertisers[0]?.interests || [] : []);
                          const available = mode === 'demo' ? mockInfluencers : [];
                          const matched = available.filter(inf => matchesInterests(inf, interests));
                          const list = rankAccounts(available, interests, 3).slice(0, 3);
                          const isFallback = matched.length === 0 && list.length > 0;
                          return (
                            <>
                              {isFallback && <div className="text-[11px] font-bold text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl px-3 py-2">اقتراحات أخرى — لا توجد مطابقة مباشرة لاهتماماتك</div>}
                              {list.map(inf => (
                                <div key={inf.id} className="flex items-center gap-3 p-3 rounded-xl border border-slate-100 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/50">
                                  <img src={inf.avatar} className="w-10 h-10 rounded-full object-cover" alt="" />
                                  <div className="flex-1 min-w-0">
                                    <div className="font-bold text-sm flex items-center gap-1">{inf.name} {inf.verified && <i className="ri-verified-badge-fill text-wasla text-xs"></i>}</div>
                                    <ReputationSummary account={inf} mode={mode} compact />
                                    <div className="text-xs text-slate-500">{getInfHandle(inf)} • {formatNum(getInfFollowers(inf))} متابع</div>
                                  </div>
                                  <button onClick={() => openInfluencerProfile(inf)} className="text-xs font-bold px-3 py-1.5 rounded-full border border-slate-200 dark:border-slate-600 hover:bg-white dark:hover:bg-slate-700">عرض</button>
                                </div>
                              ))}
                            </>
                          );
                        } else {
                          const interests = (profileData?.interests || []);
                          const available = mode === 'demo' ? mockAdvertisers : [];
                          const matched = available.filter(a => matchesInterests(a, interests));
                          const list = rankAccounts(interests.length && matched.length ? matched : available, interests, 3).slice(0, 3);
                          const isFallback = interests.length > 0 && matched.length === 0;
                          return (
                            <>
                              {isFallback && <div className="text-[11px] font-bold text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl px-3 py-2">اقتراحات أخرى — لا توجد مطابقة مباشرة لاهتماماتك</div>}
                              {list.map(adv => (
                                <div key={adv.id} className="flex items-center gap-3 p-3 rounded-xl border border-slate-100 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/50">
                                  <div className="w-10 h-10 rounded-full grid place-items-center text-lg" style={{ background: adv.color }}>{adv.avatar}</div>
                                  <div className="flex-1 min-w-0">
                                    <div className="font-bold text-sm">{adv.projectName}</div>
                                    <ReputationSummary account={adv} mode={mode} compact />
                                    <div className="text-xs text-slate-500">{adv.projectType} • {adv.location}</div>
                                  </div>
                                  <button onClick={() => openAdvertiserProfile(adv)} className="text-xs font-bold px-3 py-1.5 rounded-full border border-slate-200 dark:border-slate-600 hover:bg-white dark:hover:bg-slate-700">عرض</button>
                                </div>
                              ))}
                            </>
                          );
                        }
                      })()}
                      {mode === 'live' && <div className="text-center text-xs text-slate-500 py-4">لا توجد اقتراحات بعد — أكمل ملفك الشخصي أولاً</div>}
                    </div>
                    <button onClick={() => { if (auth?.role === 'advertiser') setView('browseInfluencers'); else { if (profileData?.interests?.length) setFilterInterest('اهتماماتك'); setView('browseAdvertisers'); } }} className="w-full mt-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-600 font-bold text-sm hover:bg-slate-50 dark:hover:bg-slate-800">تصفح المزيد</button>
                  </div>
                </div>
              </div>
            )}

            {/* MY CAMPAIGNS */}
            {view === 'myCampaigns' && (
              <div className="view-enter">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <SectionLabel kicker="حملاتي" title="إدارة حملاتك" desc="مسودات، نشطة، قيد التنفيذ، مكتملة وملغاة — كلها هنا." />
                  </div>
                  <button onClick={handleCreateCampaign} className="btn-primary bg-wasla hover:bg-waslaHover text-white px-5 py-3 rounded-2xl font-bold text-sm flex items-center gap-2 shadow-glass"><i className="ri-add-line"></i> إنشاء حملة</button>
                </div>
                <div className="flex flex-wrap gap-3 mt-5">
                  <div className="relative flex-1 min-w-[220px] max-w-md">
                    <i className="ri-search-line absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"></i>
                    <input value={searchCampaign} onChange={e => setSearchCampaign(e.target.value)} placeholder="ابحث باسم الحملة..." className="w-full pe-4 ps-10 py-3 rounded-2xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-[#182422] text-sm outline-none focus-ring pr-10 shadow-soft" />
                  </div>
                  <select value={campFilterStatus} onChange={e => setCampFilterStatus(e.target.value)} className="px-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-[#182422] text-sm font-bold shadow-soft focus-ring">
                    <option value="الكل">كل الحالات</option>
                    <option value="draft">مسودة</option>
                    <option value="active">نشطة</option>
                    <option value="in_progress">قيد التنفيذ</option>
                    <option value="completed">مكتملة</option>
                    <option value="cancelled">ملغاة</option>
                  </select>
                </div>

                {filteredMyCampaigns.length === 0 ? (
                  <div className="mt-6"><EmptyState icon="📢" title="لا توجد حملات" desc="ابدأ بإنشاء أول حملة لك — حدد المحتوى المطلوب والميزانية والمدة." action={<button onClick={handleCreateCampaign} className="mt-4 btn-primary bg-wasla text-white px-5 py-2.5 rounded-xl font-bold text-sm">إنشاء حملة جديدة</button>} /></div>
                ) : (
                  <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4 mt-6">
                    {filteredMyCampaigns.map(c => (
                      <div key={c.id} className="bg-white dark:bg-[#182422] rounded-[18px] border border-slate-200/60 dark:border-slate-700/60 p-5 flex flex-col shadow-soft card-premium">
                        <div className="flex items-start justify-between gap-2">
                          <h3 className="font-bold text-sm leading-snug flex-1">{c.title}</h3>
                          <Badge status={c.status} />
                        </div>
                        <div className="text-xs text-slate-500 mt-1">{c.advertiserName} • {c.createdAt}</div>
                        <div className="flex gap-1.5 mt-3 flex-wrap">
                          <span className="text-[11px] font-bold bg-slate-100 dark:bg-slate-700 px-2.5 py-1 rounded-full">{c.reels} ريلز</span>
                          <span className="text-[11px] font-bold bg-slate-100 dark:bg-slate-700 px-2.5 py-1 rounded-full">{c.stories} ستوري</span>
                          <span className="text-[11px] font-bold bg-slate-100 dark:bg-slate-700 px-2.5 py-1 rounded-full">{c.posts} منشور</span>
                        </div>
                        <div className="grid grid-cols-3 gap-2 mt-4 text-center">
                          <div className="bg-slate-50 dark:bg-slate-800 rounded-xl py-2"><div className="text-[10px] text-slate-500 font-bold">الميزانية</div><div className="text-xs font-bold text-wasla">{c.budget.toLocaleString('ar-EG')} ر.س</div></div>
                          <div className="bg-slate-50 dark:bg-slate-800 rounded-xl py-2"><div className="text-[10px] text-slate-500 font-bold">المدة</div><div className="text-xs font-bold">{c.duration}</div></div>
                          <div className="bg-slate-50 dark:bg-slate-800 rounded-xl py-2"><div className="text-[10px] text-slate-500 font-bold">الهدف</div><div className="text-xs font-bold truncate px-1">{c.goal}</div></div>
                        </div>
                        <div className="flex gap-2 mt-4">
                          <button onClick={() => openInviteFromCampaign(c)} className="flex-1 bg-wasla hover:bg-waslaHover text-white py-2 rounded-xl btn-primary text-xs font-bold">دعوة مؤثرين</button>
                          <button onClick={() => handleEditCampaign(c)} className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-600 text-xs font-bold hover:bg-slate-50 dark:hover:bg-slate-800">تعديل</button>
                          {c.status !== 'cancelled' && c.status !== 'completed' && <button onClick={() => setCancelTarget(c)} className="px-3 py-2 rounded-xl bg-danger hover:bg-red-600 text-white text-xs font-bold">إلغاء</button>}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* BROWSE INFLUENCERS */}
            {view === 'browseInfluencers' && (
              <div className="view-enter">
                <SectionLabel kicker="المؤثرون" title="تصفح المؤثرين" desc="اكتشف صناع محتوى مناسبين — باقات واضحة وروابط أعمال سابقة." />
                <div className="flex flex-wrap gap-3 mt-4">
                  <div className="relative flex-1 min-w-[200px] max-w-md">
                    <i className="ri-search-line absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"></i>
                    <input value={searchInfluencer} onChange={e => setSearchInfluencer(e.target.value)} placeholder="ابحث بالاسم أو المعرف..." className="w-full py-3 rounded-2xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-[#182422] text-sm outline-none focus-ring shadow-soft pr-10 ps-4" />
                  </div>
                  <select value={filterInterest} onChange={e => setFilterInterest(e.target.value)} className="px-3 py-3 rounded-2xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-[#182422] text-sm font-bold shadow-soft focus-ring">
                    <option>الكل</option><option>اهتماماتك</option><option>مكياج</option><option>تجميل</option><option>فعاليات</option><option>تقنية</option><option>أزياء</option><option>رياضة</option><option>سفر</option>
                  </select>
                  <select value={followerRange} onChange={e => setFollowerRange(e.target.value)} className="px-3 py-3 rounded-2xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-[#182422] text-sm font-bold shadow-soft focus-ring">
                    <option>الكل</option><option>أقل من 50 ألف</option><option>50 - 200 ألف</option><option>أكثر من 200 ألف</option>
                  </select>
                </div>

                {filteredInfluencers.length === 0 ? (
                  <div className="mt-6"><EmptyState icon="🔍" title={mode === 'live' ? 'لا يوجد مؤثرون بعد' : 'لا نتائج'} desc={mode === 'live' ? 'الوضع الحي فارغ حالياً — سيظهر المؤثرون هنا بعد تسجيلهم.' : 'جرّب تغيير البحث أو الفلاتر.'} /></div>
                ) : (
                  <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4 mt-6">
                    {filteredInfluencers.map(inf => (
                      <div key={inf.id} className="bg-white dark:bg-[#182422] rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden shadow-soft card-premium flex flex-col">
                        <div className="p-5 flex gap-3">
                          <img src={inf.avatar} className="w-14 h-14 rounded-full object-cover border-2 border-white shadow" alt="" />
                          <div className="flex-1 min-w-0">
                            <div className="font-bold text-sm flex items-center gap-1">{inf.name} {inf.verified && <i className="ri-verified-badge-fill text-wasla"></i>}</div>
                            <ReputationSummary account={inf} mode={mode} />
                            <div className="text-xs text-slate-500 flex items-center gap-1">{getInfPlatform(inf) === 'both' ? <><i className="ri-instagram-line"></i> {inf.handles.ig} <span className="mx-1">•</span> <i className="ri-facebook-circle-line"></i> {inf.handles.fb}</> : <><i className={getInfPlatform(inf) === 'instagram' ? 'ri-instagram-line' : 'ri-facebook-circle-line'}></i> {getInfHandle(inf)}</>} </div>
                            <div className="text-xs font-bold text-wasla mt-0.5">{(() => { const v = inf.followers; if (typeof v === 'object') return [v.ig && `${formatNum(Number(v.ig))} إنستغرام`, v.fb && `${formatNum(Number(v.fb))} فيسبوك`].filter(Boolean).join(' • ') || '—'; return `${formatNum(v)} متابع`; })()}</div>
                          </div>
                        </div>
                        <div className="px-5">
                          <div className="flex flex-wrap gap-1.5">
                            {inf.interests.map(tag => <span key={tag} className="text-[11px] bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded-full font-bold">{tag}</span>)}
                          </div>
                          {inf.packages.length > 0 && (
                            <div className="mt-3 bg-slate-50 dark:bg-slate-800 rounded-xl p-3">
                              <div className="text-[11px] font-bold text-slate-500">الباقات</div>
                              {inf.packages.slice(0, 1).map(p => <div key={p.id} className="flex items-center justify-between mt-1"><span className="text-xs font-bold">{p.name} — {p.includes}</span><span className="text-xs font-bold text-emerald-600">{p.price.toLocaleString('ar-EG')} ر.س</span></div>)}
                              {inf.packages.length > 1 && <div className="text-[11px] text-slate-500 mt-1">+ {inf.packages.length - 1} باقات أخرى</div>}
                            </div>
                          )}
                        </div>
                        <div className="p-4 flex gap-2 mt-auto">
                          <button onClick={() => openInfluencerProfile(inf)} className="flex-1 py-2 rounded-xl border border-slate-200 dark:border-slate-600 font-bold text-xs hover:bg-slate-50 dark:hover:bg-slate-800">عرض التفاصيل</button>
                          {auth?.role === 'advertiser' && (
                            <>
                              <button onClick={() => openInviteFromBrowse(inf)} className="flex-1 py-2 rounded-xl bg-wasla text-white font-bold text-xs hover:bg-waslaHover">دعوة لحملة</button>
                              {inf.packages.length > 0 && <button onClick={() => openPackageFlow(inf, inf.packages[0])} className="px-3 py-2 rounded-xl bg-emerald-500 text-white font-bold text-xs hover:bg-emerald-600" title="طلب تعاون عبر الباقة"><i className="ri-handbag-line"></i></button>}
                            </>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* BROWSE ADVERTISERS */}
            {view === 'browseAdvertisers' && (
              <div className="view-enter">
                <SectionLabel kicker="المعلنون" title="تصفح المعلنين" desc="تعرّف على المشاريع والمتاجر — واطلع على حملاتهم العامة." />
                <div className="flex flex-wrap gap-3 mt-4">
                  <div className="relative flex-1 min-w-[200px] max-w-md">
                    <i className="ri-search-line absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"></i>
                    <input value={searchAdvertiser} onChange={e => setSearchAdvertiser(e.target.value)} placeholder="ابحث باسم المشروع..." className="w-full py-3 rounded-2xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-[#182422] text-sm outline-none focus-ring shadow-soft pr-10 ps-4" />
                  </div>
                  <select value={advFilterType} onChange={e => setAdvFilterType(e.target.value)} className="px-3 py-3 rounded-2xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-[#182422] text-sm font-bold shadow-soft focus-ring">
                    <option>الكل</option><option>اهتماماتك</option><option>مطاعم ومقاهي</option><option>أزياء وتجميل</option><option>تقنية</option><option>عطور وبخور</option><option>رياضة ولياقة</option>
                  </select>
                </div>
                {filteredAdvertisers.length === 0 ? (
                  <div className="mt-6"><EmptyState icon="🏬" title={exploreFilter === 'اهتماماتك' || advFilterType === 'اهتماماتك' ? 'لا توجد نتائج مطابقة لاهتماماتك' : 'لا نتائج'} desc={exploreFilter === 'اهتماماتك' || advFilterType === 'اهتماماتك' ? 'جرّب إزالة الفلتر أو اختر "الكل"' : mode === 'live' ? 'الوضع الحي فارغ — سيظهر المعلنون بعد تسجيلهم.' : 'جرّب تغيير البحث أو الفلتر.'} /></div>
                ) : (
                  <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4 mt-6">
                    {filteredAdvertisers.slice(0, auth?.role === 'advertiser' ? visibleAdvCount : filteredAdvertisers.length).map(adv => (
                      <div key={adv.id} className="bg-white dark:bg-[#182422] rounded-[18px] border border-slate-200/60 dark:border-slate-700/60 p-5 shadow-soft card-premium">
                        <div className="flex gap-3">
                          <div className="w-12 h-12 rounded-xl grid place-items-center text-xl border border-slate-100 dark:border-slate-600 shadow-sm" style={{ background: adv.color }}>{adv.avatar}</div>
                          <div className="flex-1">
                            <div className="font-bold text-sm">{adv.projectName}</div>
                            <ReputationSummary account={adv} mode={mode} compact />
                            <div className="text-xs text-slate-500">{adv.projectType} • {adv.location}</div>
                            <div className="text-[11px] text-slate-500 mt-1 line-clamp-2">{adv.desc}</div>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-1.5 mt-3">
                          {adv.interests.map(t => <span key={t} className="text-[11px] bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded-full font-bold">{t}</span>)}
                        </div>
                        <div className="flex items-center justify-between mt-4">
                          <span className="text-xs text-slate-500">{adv.campaignsCount} حملات</span>
                          <button onClick={() => openAdvertiserProfile(adv)} className="px-4 py-1.5 rounded-full bg-wasla text-white text-xs font-bold hover:bg-waslaHover">عرض التفاصيل</button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                {auth?.role === 'advertiser' && visibleAdvCount < filteredAdvertisers.length && <button onClick={() => setVisibleAdvCount(v => v + 10)} className="w-full mt-4 py-3 rounded-xl border-2 border-dashed border-slate-200 dark:border-slate-600 text-sm font-bold text-wasla hover:bg-waslaSoft dark:hover:bg-wasla/10">تحميل المزيد — {Math.min(10, filteredAdvertisers.length - visibleAdvCount)} إضافية</button>}
              </div>
            )}

            {/* EXPLORE CAMPAIGNS */}
            {view === 'exploreCampaigns' && (
              <div className="view-enter">
                <SectionLabel kicker="السوق" title="استكشاف الحملات" desc="حملات عامة — نشطة وقيد التنفيذ ومكتملة. التقديم للمؤثرين فقط." />
                <div className="flex flex-wrap gap-3 mt-4">
                  <div className="relative flex-1 min-w-[200px] max-w-md">
                    <i className="ri-search-line absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"></i>
                    <input value={exploreSearch} onChange={e => setExploreSearch(e.target.value)} placeholder="ابحث باسم الحملة أو المعلن..." className="w-full py-3 rounded-2xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-[#182422] text-sm outline-none focus-ring shadow-soft pr-10 ps-4" />
                  </div>
                  <select value={exploreFilter} onChange={e => setExploreFilter(e.target.value)} className="px-3 py-3 rounded-2xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-[#182422] text-sm font-bold shadow-soft focus-ring">
                    <option value="الكل">كل الحالات</option>{auth?.role === 'influencer' && <option value="اهتماماتك">اهتماماتك</option>}<option value="completed">حملاتي</option><option value="active">نشطة</option><option value="in_progress">قيد التنفيذ</option><option value="completed">مكتملة</option>
                  </select>
                </div>
                {exploreCampaigns.length === 0 ? (
                  <div className="mt-6"><EmptyState icon="📋" title={exploreFilter === 'اهتماماتك' ? 'لا توجد نتائج مطابقة لاهتماماتك' : 'لا نتائج'} desc={exploreFilter === 'اهتماماتك' ? 'جرّب إزالة الفلتر أو اختر "الكل"' : mode === 'live' ? 'الوضع الحي فارغ — ستظهر الحملات العامة بعد إنشائها.' : 'جرّب تغيير البحث أو الحالة.'} /></div>
                ) : (
                  <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4 mt-6">
                    {exploreCampaigns.slice(0, auth?.role === 'advertiser' ? visibleCampCount : exploreCampaigns.length).map(c => {
                      const isInvited = false; // demo: no invite tracking per user for explore
                      return (
                        <div key={c.id} className="bg-white dark:bg-[#182422] rounded-2xl border border-slate-200 dark:border-slate-700 p-5 shadow-soft card-premium flex flex-col">
                          <div className="flex items-start justify-between gap-2">
                            <h3 className="font-bold text-sm leading-snug flex-1">{c.title}</h3>
                            <Badge status={c.status} />
                          </div>
                          <div className="text-xs text-slate-500 mt-1 flex items-center gap-1"><i className="ri-store-2-line"></i> {c.advertiserName}</div>
                          <ReputationSummary account={getCampaignAdvertiser(c, ownReputationAccount)} mode={mode} compact />
                          <div className="flex gap-1.5 mt-3 flex-wrap">
                            <span className="text-[11px] font-bold bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded-full">{c.reels} ريلز</span>
                            <span className="text-[11px] font-bold bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded-full">{c.stories} ستوري</span>
                            <span className="text-[11px] font-bold bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded-full">{c.posts} منشور</span>
                          </div>
                          <div className="grid grid-cols-3 gap-2 mt-4 text-center">
                            <div className="bg-slate-50 dark:bg-slate-800 rounded-xl py-2"><div className="text-[10px] text-slate-500 font-bold">الميزانية</div><div className="text-xs font-bold text-wasla">{c.budget.toLocaleString('ar-EG')} ر.س</div></div>
                            <div className="bg-slate-50 dark:bg-slate-800 rounded-xl py-2"><div className="text-[10px] text-slate-500 font-bold">المدة</div><div className="text-xs font-bold">{c.duration}</div></div>
                            <div className="bg-slate-50 dark:bg-slate-800 rounded-xl py-2"><div className="text-[10px] text-slate-500 font-bold">الهدف</div><div className="text-xs font-bold truncate px-1">{c.goal}</div></div>
                          </div>
                          <button onClick={() => { setDetailCamp(c); setShowDetailModal(true); }} className="w-full mt-4 py-2.5 rounded-xl bg-wasla text-white text-xs font-bold hover:bg-waslaHover btn-primary">عرض التفاصيل</button>
                        </div>
                      );
                    })}
                  </div>
                )}
                {auth?.role === 'advertiser' && visibleCampCount < exploreCampaigns.length && <button onClick={() => setVisibleCampCount(v => v + 10)} className="w-full mt-4 py-3 rounded-xl border-2 border-dashed border-slate-200 dark:border-slate-600 text-sm font-bold text-wasla hover:bg-waslaSoft dark:hover:bg-wasla/10">تحميل المزيد — {Math.min(10, exploreCampaigns.length - visibleCampCount)} إضافية</button>}
              </div>
            )}

            {/* PROFILE */}
            {view === 'profile' && (
              <div className="view-enter">
                {/* own profile edit vs viewed */}
                {viewedAdvertiser || viewedInfluencer ? (
                  // viewed profile
                  // <div>
                  //   <button onClick={closeViewedProfile} className="text-sm font-bold text-wasla flex items-center gap-1 hover:underline"><i className="ri-arrow-right-line"></i> رجوع</button>
                  //   {viewedInfluencer ? (
                  //     <div className="bg-white dark:bg-[#182422] rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden mt-4">
                  //       <div className="h-24 bg-gradient-to-1 from-teal-500 to-teal-500"></div>
                  //       <div className="px-6 pb-6">
                  //         <div className="flex gap-4 -mt-8 items-end" dir="ltr">
                  //           <img src={viewedInfluencer.avatar} className="w-20 h-20 rounded-2xl object-cover border-4 border-white dark:border-[#182422] shadow shrink-0" alt=""/>
                  //           <div className="pb-2 text-start" dir="rtl">
                  //             <div className="font-bold text-lg flex items-center gap-1">{viewedInfluencer.name} {viewedInfluencer.verified && <i className="ri-verified-badge-fill text-wasla"></i>}</div>
                  //             <div className="text-sm text-slate-500 flex flex-wrap items-center gap-1.5">
                  //               {viewedInfluencer.platforms ? (
                  //                 <>
                  //                   {viewedInfluencer.platforms.instagram && <span className="inline-flex items-center gap-1"><i className="ri-instagram-line"></i> {viewedInfluencer.handles?.ig||viewedInfluencer.handle} • {formatNum(Number(viewedInfluencer.followers?.ig||viewedInfluencer.followersByPlatform?.ig||0))} متابع</span>}
                  //                   {viewedInfluencer.platforms.instagram && viewedInfluencer.platforms.facebook && <span className="mx-1">•</span>}
                  //                   {viewedInfluencer.platforms.facebook && <span className="inline-flex items-center gap-1"><i className="ri-facebook-circle-line"></i> {viewedInfluencer.handles?.fb} • {formatNum(Number(viewedInfluencer.followers?.fb||viewedInfluencer.followersByPlatform?.fb||0))} متابع</span>}
                  //                 </>
                  //               ) : (
                  //                 <><i className={viewedInfluencer.platform==='instagram'?'ri-instagram-line':'ri-facebook-circle-line'}></i> {viewedInfluencer.handle} • {formatNum(getInfFollowers(viewedInfluencer))} متابع</>
                  //               )}
                  //             </div>
                  //             {viewedInfluencer.bio && <div className="text-xs text-slate-500 mt-1">{viewedInfluencer.bio}</div>}
                  //           </div>
                  //         </div>
                  //         <p className="text-sm text-slate-600 dark:text-slate-300 mt-4 leading-relaxed">{viewedInfluencer.bio}</p>
                  //         <div className="flex flex-wrap gap-1.5 mt-3">
                  //           {viewedInfluencer.interests.map(t=> <span key={t} className="text-xs bg-teal-50 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300 px-2.5 py-1 rounded-full font-bold">{t}</span>)}
                  //         </div>
                  //         {viewedInfluencer.packages.length>0 && (
                  //           <div className="mt-5">
                  //             <h4 className="font-bold text-sm">الباقات</h4>
                  //             <div className="grid sm:grid-cols-2 gap-3 mt-2">
                  //               {viewedInfluencer.packages.map(p=>(
                  //                 <div key={p.id} className="border border-slate-200 dark:border-slate-700 rounded-xl p-4 bg-slate-50/50 dark:bg-slate-800/30">
                  //                   <div className="font-bold text-sm">{p.name}</div>
                  //                   <div className="text-xs text-slate-500 mt-1">{p.includes}</div>
                  //                   <div className="font-bold text-emerald-600 mt-2">{p.price.toLocaleString('ar-EG')} ر.س</div>
                  //                   {auth?.role==='advertiser' && <button onClick={()=>openPackageFlow(viewedInfluencer,p)} className="w-full mt-3 py-2 rounded-xl bg-wasla text-white text-xs font-bold hover:bg-waslaHover">طلب التعاون عبر هذه الباقة</button>}
                  //                 </div>
                  //               ))}
                  //             </div>
                  //           </div>
                  //         )}
                  //         {viewedInfluencer.works.length>0 && (
                  //           <div className="mt-5">
                  //             <h4 className="font-bold text-sm">أفضل الأعمال (حتى 3)</h4>
                  //             <div className="flex flex-wrap gap-2 mt-2">
                  //               {viewedInfluencer.works.map((w,i)=> <a key={i} href="#" onClick={e=>e.preventDefault()} className="text-xs text-wasla bg-teal-50 dark:bg-teal-900/20 px-3 py-1.5 rounded-full font-bold hover:underline">{w}</a>)}
                  //             </div>
                  //           </div>
                  //         )}
                  //         <div className="mt-5 p-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                  //           <h4 className="font-bold text-sm">المعلنون المتعاونون</h4>
                  //           <p className="text-xs text-slate-500 mt-1">قائمة جهات تعاون سابقة (تجريبي)</p>
                  //           <div className="flex gap-3 mt-3">
                  //             {mockAdvertisers.slice(0,3).map(a=> <div key={a.id} className="text-center"><div className="w-10 h-10 rounded-full grid place-items-center text-sm border border-white shadow mx-auto" style={{background:a.color}}>{a.avatar}</div><div className="text-[11px] font-bold mt-1 truncate max-w-[80px]">{a.projectName}</div></div>)}
                  //           </div>
                  //         </div>
                  //         {auth?.role==='advertiser' && (
                  //           <div className="flex gap-2 mt-5">
                  //             <button onClick={()=>openInviteFromBrowse(viewedInfluencer)} className="flex-1 py-3 rounded-xl bg-wasla text-white font-bold text-sm hover:bg-waslaHover">دعوة لحملة</button>
                  //             <button onClick={()=>{setView('messages'); showToast('افتح المحادثة للتواصل','info');}} className="px-5 py-3 rounded-xl border border-slate-200 dark:border-slate-600 font-bold text-sm hover:bg-slate-50 dark:hover:bg-slate-800">مراسلة</button>
                  //           </div>
                  //         )}
                  //       </div>
                  //     </div>
                  //   ) : (
                  //     <div className="bg-white dark:bg-[#182422] rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden mt-4">
                  //       <div className="h-24 bg-gradient-to-l from-emerald-500 to-teal-500"></div>
                  //       <div className="px-6 pb-6">
                  //         <div className="flex gap-4 -mt-8 items-end" dir="ltr">
                  //           <div className="w-20 h-20 rounded-2xl grid place-items-center text-3xl border-4 border-white dark:border-[#182422] shadow shrink-0" style={{background:viewedAdvertiser.color}}>{viewedAdvertiser.avatar}</div>
                  //           <div className="pb-2 text-start" dir="rtl">
                  //             <div className="font-bold text-lg">{viewedAdvertiser.projectName}</div>
                  //             <div className="text-sm text-slate-500">{viewedAdvertiser.projectType} • {viewedAdvertiser.location}</div>
                  //           </div>
                  //         </div>
                  //         <p className="text-sm text-slate-600 dark:text-slate-300 mt-4">{viewedAdvertiser.desc}</p>
                  //         <div className="grid sm:grid-cols-2 gap-3 mt-4 text-sm">
                  //           <div className="flex items-center gap-2"><i className="ri-phone-line text-slate-400"></i> {viewedAdvertiser.phone}</div>
                  //           <div className="flex items-center gap-2"><i className="ri-links-line text-slate-400"></i> {viewedAdvertiser.socialUrl}</div>
                  //         </div>
                  //         <div className="flex flex-wrap gap-1.5 mt-3">
                  //           {viewedAdvertiser.interests.map(t=> <span key={t} className="text-xs bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300 px-2.5 py-1 rounded-full font-bold">{t}</span>)}
                  //         </div>
                  //         <div className="mt-5">
                  //           <h4 className="font-bold text-sm">الحملات العامة</h4>
                  //           <div className="grid sm:grid-cols-2 gap-3 mt-2">
                  //             {campaigns.filter(c=>c.advertiserId===viewedAdvertiser.id && ['active','in_progress','completed'].includes(c.status)).slice(0,2).map(c=>(
                  //               <div key={c.id} className="border border-slate-200 dark:border-slate-700 rounded-xl p-3 card-premium flex flex-col">
                  //                 <div className="font-bold text-xs flex-1">{c.title}</div>
                  //                 <div className="text-[11px] text-slate-500 mt-1">{c.reels} ريلز • {c.stories} ستوري • {c.posts} منشور • {c.budget.toLocaleString('ar-EG')} ر.س</div>
                  //                 <Badge status={c.status}/>
                  //                 <button onClick={()=>{ setDetailCamp(c); setShowDetailModal(true); }} className="w-full mt-2 py-1.5 rounded-xl border border-slate-200 dark:border-slate-600 text-[11px] font-bold hover:bg-slate-50 dark:hover:bg-slate-800">عرض التفاصيل</button>
                  //               </div>
                  //             ))}
                  //           </div>
                  //         </div>
                  //         <div className="mt-5 p-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                  //           <h4 className="font-bold text-sm">المؤثرون المتعاونون</h4>
                  //           <div className="flex gap-3 mt-3">
                  //             {mockInfluencers.slice(0,3).map(inf=> <div key={inf.id} className="text-center"><img src={inf.avatar} className="w-10 h-10 rounded-full object-cover border-2 border-white shadow mx-auto" alt=""/><div className="text-[11px] font-bold mt-1 truncate max-w-[80px]">{inf.name.split(' ')[0]}</div></div>)}
                  //           </div>
                  //           <p className="text-[11px] text-slate-500 mt-2">يظهر هنا سجل التعاونات المكتملة.</p>
                  //         </div>
                  //       </div>
                  //     </div>
                  //   )}
                  // </div>


                  // <div>
                  //   <button 
                  //     onClick={closeViewedProfile} 
                  //     className="text-sm font-bold text-wasla flex items-center gap-1 hover:underline mb-3"
                  //   >
                  //     <i className="ri-arrow-right-line"></i> رجوع
                  //   </button>

                  //   {viewedInfluencer ? (
                  //     <div className="bg-white dark:bg-[#182422] rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden shadow-sm">
                  //       {/* Cover Header */}
                  //       <div className="h-28 bg-gradient-to-r from-teal-500 to-emerald-500"></div>

                  //       <div className="px-6 pb-6">
                  //         {/* Profile Header (Instagram Style) */}
                  //         <div className="flex flex-col sm:flex-row items-center sm:items-end justify-between gap-4 -mt-12 mb-4">
                  //           <div className="flex flex-col sm:flex-row items-center sm:items-end gap-4 text-center sm:text-right">
                  //             <img 
                  //               src={viewedInfluencer.avatar} 
                  //               className="w-24 h-24 rounded-full object-cover border-4 border-white dark:border-[#182422] shadow-md shrink-0" 
                  //               alt=""
                  //             />
                  //             <div className="mb-1">
                  //               <h3 className="font-bold text-xl flex items-center justify-center sm:justify-start gap-1.5 text-slate-900 dark:text-white">
                  //                 {viewedInfluencer.name} 
                  //                 {viewedInfluencer.verified && <i className="ri-verified-badge-fill text-wasla text-lg"></i>}
                  //               </h3>
                  //               {viewedInfluencer.bio && (
                  //                 <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-md">
                  //                   {viewedInfluencer.bio}
                  //                 </p>
                  //               )}
                  //             </div>
                  //           </div>

                  //           {/* Social Stats Header */}
                  //           <div className="flex items-center gap-4 bg-slate-50 dark:bg-slate-800/60 px-4 py-2 rounded-xl border border-slate-200/60 dark:border-slate-700">
                  //             {viewedInfluencer.platforms ? (
                  //               <>
                  //                 {viewedInfluencer.platforms.instagram && (
                  //                   <div className="text-center px-2">
                  //                     <span className="block font-extrabold text-sm text-slate-800 dark:text-slate-100">
                  //                       {formatNum(Number(viewedInfluencer.followers?.ig||viewedInfluencer.followersByPlatform?.ig||0))}
                  //                     </span>
                  //                     <span className="text-[11px] text-slate-500 flex items-center justify-center gap-1">
                  //                       <i className="ri-instagram-line"></i> {viewedInfluencer.handles?.ig||viewedInfluencer.handle}
                  //                     </span>
                  //                   </div>
                  //                 )}
                  //                 {viewedInfluencer.platforms.instagram && viewedInfluencer.platforms.facebook && (
                  //                   <div className="h-6 w-[1px] bg-slate-200 dark:bg-slate-700"></div>
                  //                 )}
                  //                 {viewedInfluencer.platforms.facebook && (
                  //                   <div className="text-center px-2">
                  //                     <span className="block font-extrabold text-sm text-slate-800 dark:text-slate-100">
                  //                       {formatNum(Number(viewedInfluencer.followers?.fb||viewedInfluencer.followersByPlatform?.fb||0))}
                  //                     </span>
                  //                     <span className="text-[11px] text-slate-500 flex items-center justify-center gap-1">
                  //                       <i className="ri-facebook-circle-line"></i> {viewedInfluencer.handles?.fb}
                  //                     </span>
                  //                   </div>
                  //                 )}
                  //               </>
                  //             ) : (
                  //               <div className="text-center px-2">
                  //                 <span className="block font-extrabold text-sm text-slate-800 dark:text-slate-100">
                  //                   {formatNum(getInfFollowers(viewedInfluencer))}
                  //                 </span>
                  //                 <span className="text-[11px] text-slate-500 flex items-center justify-center gap-1">
                  //                   <i className={viewedInfluencer.platform==='instagram'?'ri-instagram-line':'ri-facebook-circle-line'}></i> {viewedInfluencer.handle}
                  //                 </span>
                  //               </div>
                  //             )}
                  //           </div>
                  //         </div>

                  //         {/* Interests Badges */}
                  //         <div className="flex flex-wrap gap-1.5 mt-4 pt-3 border-t border-slate-100 dark:border-slate-800">
                  //           {viewedInfluencer.interests.map(t=> (
                  //             <span key={t} className="text-xs bg-teal-50 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300 px-3 py-1 rounded-full font-bold">
                  //               #{t}
                  //             </span>
                  //           ))}
                  //         </div>

                  //         {/* Packages Section */}
                  //         {viewedInfluencer.packages.length > 0 && (
                  //           <div className="mt-6">
                  //             <h4 className="font-bold text-sm text-slate-800 dark:text-slate-200 flex items-center gap-1.5 mb-3">
                  //               <i className="ri-vip-crown-line text-wasla"></i> الباقات المتاحة
                  //             </h4>
                  //             <div className="grid sm:grid-cols-2 gap-3">
                  //               {viewedInfluencer.packages.map(p=>(
                  //                 <div key={p.id} className="border border-slate-200 dark:border-slate-700 rounded-xl p-4 bg-slate-50/50 dark:bg-slate-800/30 hover:border-teal-500/50 transition-colors">
                  //                   <div className="font-bold text-sm text-slate-900 dark:text-slate-100">{p.name}</div>
                  //                   <div className="text-xs text-slate-500 mt-1">{p.includes}</div>
                  //                   <div className="font-bold text-emerald-600 dark:text-emerald-400 mt-2 text-base">{p.price.toLocaleString('ar-EG')} ر.س</div>
                  //                   {auth?.role==='advertiser' && (
                  //                     <button onClick={()=>openPackageFlow(viewedInfluencer,p)} className="w-full mt-3 py-2 rounded-xl bg-wasla text-white text-xs font-bold hover:bg-waslaHover transition-colors">
                  //                       طلب التعاون عبر هذه الباقة
                  //                     </button>
                  //                   )}
                  //                 </div>
                  //               ))}
                  //             </div>
                  //           </div>
                  //         )}

                  //         {/* Works Section */}
                  //         {viewedInfluencer.works.length > 0 && (
                  //           <div className="mt-6">
                  //             <h4 className="font-bold text-sm text-slate-800 dark:text-slate-200 mb-2">أبرز الأعمال</h4>
                  //             <div className="flex flex-wrap gap-2">
                  //               {viewedInfluencer.works.map((w,i)=> (
                  //                 <a key={i} href="#" onClick={e=>e.preventDefault()} className="text-xs text-wasla bg-teal-50 dark:bg-teal-900/20 px-3.5 py-1.5 rounded-full font-bold hover:underline">
                  //                   {w}
                  //                 </a>
                  //               ))}
                  //             </div>
                  //           </div>
                  //         )}

                  //         {/* Advertisers Collaborated */}
                  //         <div className="mt-6 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
                  //           <h4 className="font-bold text-sm text-slate-800 dark:text-slate-200">المعلنون المتعاونون</h4>
                  //           <p className="text-xs text-slate-500 mt-0.5">سجل التعاونات الأخيرة</p>
                  //           <div className="flex gap-4 mt-3">
                  //             {mockAdvertisers.slice(0,3).map(a=> (
                  //               <div key={a.id} className="text-center group">
                  //                 <div className="w-12 h-12 rounded-full grid place-items-center text-sm border-2 border-white dark:border-slate-700 shadow-sm mx-auto transition-transform group-hover:scale-105" style={{background:a.color}}>
                  //                   {a.avatar}
                  //                 </div>
                  //                 <div className="text-[11px] font-bold mt-1.5 truncate max-w-[80px] text-slate-700 dark:text-slate-300">
                  //                   {a.projectName}
                  //                 </div>
                  //               </div>
                  //             ))}
                  //           </div>
                  //         </div>

                  //         {/* Action Buttons */}
                  //         {auth?.role==='advertiser' && (
                  //           <div className="flex gap-3 mt-6 pt-4 border-t border-slate-100 dark:border-slate-800">
                  //             <button onClick={()=>openInviteFromBrowse(viewedInfluencer)} className="flex-1 py-3 rounded-xl bg-wasla text-white font-bold text-sm hover:bg-waslaHover transition-colors shadow-sm">
                  //               دعوة لحملة
                  //             </button>
                  //             <button onClick={()=>{setView('messages'); showToast('افتح المحادثة للتواصل','info');}} className="px-6 py-3 rounded-xl border border-slate-200 dark:border-slate-600 font-bold text-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                  //               مراسلة
                  //             </button>
                  //           </div>
                  //         )}
                  //       </div>
                  //     </div>
                  //   ) : (
                  //     /* Advertiser Profile Layout */
                  //     <div className="bg-white dark:bg-[#182422] rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden shadow-sm">
                  //       {/* Cover Header */}
                  //       <div className="h-28 bg-gradient-to-r from-emerald-500 to-teal-500"></div>

                  //       <div className="px-6 pb-6">
                  //         {/* Profile Header */}
                  //         <div className="flex flex-col sm:flex-row items-center sm:items-end justify-between gap-4 -mt-12 mb-4">
                  //           <div className="flex flex-col sm:flex-row items-center sm:items-end gap-4 text-center sm:text-right">
                  //             <div 
                  //               className="w-24 h-24 rounded-2xl grid place-items-center text-4xl border-4 border-white dark:border-[#182422] shadow-md shrink-0" 
                  //               style={{background:viewedAdvertiser.color}}
                  //             >
                  //               {viewedAdvertiser.avatar}
                  //             </div>
                  //             <div className="mb-1">
                  //               <h3 className="font-bold text-xl text-slate-900 dark:text-white">
                  //                 {viewedAdvertiser.projectName}
                  //               </h3>
                  //               <div className="text-xs text-slate-500 dark:text-slate-400 mt-1 flex items-center justify-center sm:justify-start gap-2">
                  //                 <span>{viewedAdvertiser.projectType}</span>
                  //                 {viewedAdvertiser.location && <span>• {viewedAdvertiser.location}</span>}
                  //               </div>
                  //             </div>
                  //           </div>
                  //         </div>

                  //         <p className="text-sm text-slate-600 dark:text-slate-300 mt-3 leading-relaxed">
                  //           {viewedAdvertiser.desc}
                  //         </p>

                  //         {/* Contact Links Box */}
                  //         <div className="grid sm:grid-cols-2 gap-2.5 mt-4 p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl text-xs font-medium">
                  //           <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                  //             <i className="ri-phone-line text-wasla text-sm"></i> 
                  //             <span>{viewedAdvertiser.phone}</span>
                  //           </div>
                  //           <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                  //             <i className="ri-links-line text-wasla text-sm"></i> 
                  //             <span className="truncate">{viewedAdvertiser.socialUrl}</span>
                  //           </div>
                  //         </div>

                  //         {/* Interests */}
                  //         <div className="flex flex-wrap gap-1.5 mt-4">
                  //           {viewedAdvertiser.interests.map(t=> (
                  //             <span key={t} className="text-xs bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300 px-3 py-1 rounded-full font-bold">
                  //               #{t}
                  //             </span>
                  //           ))}
                  //         </div>

                  //         {/* Campaigns */}
                  //         <div className="mt-6">
                  //           <h4 className="font-bold text-sm text-slate-800 dark:text-slate-200 mb-3">الحملات العامة</h4>
                  //           <div className="grid sm:grid-cols-2 gap-3">
                  //             {campaigns.filter(c=>c.advertiserId===viewedAdvertiser.id && ['active','in_progress','completed'].includes(c.status)).slice(0,2).map(c=>(
                  //               <div key={c.id} className="border border-slate-200 dark:border-slate-700 rounded-xl p-3.5 card-premium flex flex-col justify-between">
                  //                 <div>
                  //                   <div className="font-bold text-xs text-slate-900 dark:text-slate-100">{c.title}</div>
                  //                   <div className="text-[11px] text-slate-500 mt-1">
                  //                     {c.reels} ريلز • {c.stories} ستوري • {c.posts} منشور • {c.budget.toLocaleString('ar-EG')} ر.س
                  //                   </div>
                  //                 </div>
                  //                 <div className="mt-3 flex items-center justify-between gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                  //                   <Badge status={c.status}/>
                  //                   <button onClick={()=>{ setDetailCamp(c); setShowDetailModal(true); }} className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-600 text-[11px] font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                  //                     عرض التفاصيل
                  //                   </button>
                  //                 </div>
                  //               </div>
                  //             ))}
                  //           </div>
                  //         </div>

                  //         {/* Collaborated Influencers */}
                  //         <div className="mt-6 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
                  //           <h4 className="font-bold text-sm text-slate-800 dark:text-slate-200">المؤثرون المتعاونون</h4>
                  //           <div className="flex gap-4 mt-3">
                  //             {mockInfluencers.slice(0,3).map(inf=> (
                  //               <div key={inf.id} className="text-center group">
                  //                 <img src={inf.avatar} className="w-12 h-12 rounded-full object-cover border-2 border-white dark:border-slate-700 shadow-sm mx-auto transition-transform group-hover:scale-105" alt=""/>
                  //                 <div className="text-[11px] font-bold mt-1.5 truncate max-w-[80px] text-slate-700 dark:text-slate-300">
                  //                   {inf.name.split(' ')[0]}
                  //                 </div>
                  //               </div>
                  //             ))}
                  //           </div>
                  //           <p className="text-[11px] text-slate-500 mt-2">سجل التعاونات المكتملة.</p>
                  //         </div>
                  //       </div>
                  //     </div>
                  //   )}
                  // </div>

                  <div>
                    <button
                      onClick={closeViewedProfile}
                      className="text-sm font-bold text-wasla flex items-center gap-1 hover:underline mb-3"
                    >
                      <i className="ri-arrow-right-line"></i> رجوع
                    </button>

                    {viewedInfluencer ? (
                      <div className="bg-white dark:bg-[#182422] rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden shadow-sm p-6">
                        {/* Instagram Style Header (Avatar on Left, Details on Right in LTR/RTL flow) */}
                        <div className="flex items-start gap-5">
                          {/* Avatar on Left */}


                          {/* Info Column */}
                          <div className="flex-1 min-w-0">
                            {/* Name & Verification */}
                            <h3 className="font-bold text-lg sm:text-xl flex items-center gap-1.5 text-slate-900 dark:text-white">
                              {viewedInfluencer.name}
                              {viewedInfluencer.verified && <i className="ri-verified-badge-fill text-wasla text-lg"></i>}
                            </h3>
                            <ReputationSummary account={viewedInfluencer} mode={mode} />

                            {/* Platform & Followers */}
                            <div className="text-sm text-slate-600 dark:text-slate-300 mt-1 flex flex-wrap items-center gap-2">
                              {viewedInfluencer.platforms ? (
                                <>
                                  {viewedInfluencer.platforms.instagram && (
                                    <span className="inline-flex items-center gap-1 font-medium">
                                      <i className="ri-instagram-line text-wasla"></i> {viewedInfluencer.handles?.ig || viewedInfluencer.handle}
                                      <span className="text-slate-400">•</span> {formatNum(Number(viewedInfluencer.followers?.ig || viewedInfluencer.followersByPlatform?.ig || 0))} متابع
                                    </span>
                                  )}
                                  {viewedInfluencer.platforms.instagram && viewedInfluencer.platforms.facebook && (
                                    <span className="text-slate-300 dark:text-slate-600">|</span>
                                  )}
                                  {viewedInfluencer.platforms.facebook && (
                                    <span className="inline-flex items-center gap-1 font-medium">
                                      <i className="ri-facebook-circle-line text-wasla"></i> {viewedInfluencer.handles?.fb}
                                      <span className="text-slate-400">•</span> {formatNum(Number(viewedInfluencer.followers?.fb || viewedInfluencer.followersByPlatform?.fb || 0))} متابع
                                    </span>
                                  )}
                                </>
                              ) : (
                                <span className="inline-flex items-center gap-1 font-medium">
                                  <i className={viewedInfluencer.platform === 'instagram' ? 'ri-instagram-line' : 'ri-facebook-circle-line text-wasla'}></i> {viewedInfluencer.handle}
                                  <span className="text-slate-400">•</span> {formatNum(getInfFollowers(viewedInfluencer))} متابع
                                </span>
                              )}
                            </div>

                            {/* Bio (النبذة الشخصية) */}
                            {viewedInfluencer.bio && (
                              <p className="text-sm text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
                                {viewedInfluencer.bio}
                              </p>
                            )}
                          </div>

                          <img
                            src={viewedInfluencer.avatar}
                            className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover border border-slate-200 dark:border-slate-700 shadow-sm shrink-0"
                            alt=""
                          />
                        </div>

                        {/* Interests (الاهتمامات) */}
                        <div className="flex flex-wrap gap-1.5 mt-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                          {viewedInfluencer.interests.map(t => (
                            <span key={t} className="text-xs bg-teal-50 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300 px-3 py-1 rounded-full font-bold">
                              #{t}
                            </span>
                          ))}
                        </div>

                        {/* Packages Section */}
                        {viewedInfluencer.packages.length > 0 && (
                          <div className="mt-6">
                            <h4 className="font-bold text-sm text-slate-800 dark:text-slate-200 flex items-center gap-1.5 mb-3">
                              <i className="ri-vip-crown-line text-wasla"></i> الباقات المتاحة
                            </h4>
                            <div className="grid sm:grid-cols-2 gap-3">
                              {viewedInfluencer.packages.map(p => (
                                <div key={p.id} className="border border-slate-200 dark:border-slate-700 rounded-xl p-4 bg-slate-50/50 dark:bg-slate-800/30 hover:border-teal-500/50 transition-colors">
                                  <div className="font-bold text-sm text-slate-900 dark:text-slate-100">{p.name}</div>
                                  <div className="text-xs text-slate-500 mt-1">{p.includes}</div>
                                  <div className="font-bold text-emerald-600 dark:text-emerald-400 mt-2 text-base">{p.price.toLocaleString('ar-EG')} ر.س</div>
                                  {auth?.role === 'advertiser' && (
                                    <button onClick={() => openPackageFlow(viewedInfluencer, p)} className="w-full mt-3 py-2 rounded-xl bg-wasla text-white text-xs font-bold hover:bg-waslaHover transition-colors">
                                      طلب التعاون عبر هذه الباقة
                                    </button>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Works Section */}
                        {viewedInfluencer.works.length > 0 && (
                          <div className="mt-6">
                            <h4 className="font-bold text-sm text-slate-800 dark:text-slate-200 mb-2">أبرز الأعمال</h4>
                            <div className="flex flex-wrap gap-2">
                              {viewedInfluencer.works.map((w, i) => (
                                <a key={i} href="#" onClick={e => e.preventDefault()} className="text-xs text-wasla bg-teal-50 dark:bg-teal-900/20 px-3.5 py-1.5 rounded-full font-bold hover:underline">
                                  {w}
                                </a>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Advertisers Collaborated */}
                        <div className="mt-6 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
                          <h4 className="font-bold text-sm text-slate-800 dark:text-slate-200">المعلنون المتعاونون</h4>
                          <p className="text-xs text-slate-500 mt-0.5">سجل التعاونات الأخيرة</p>
                          <div className="flex gap-4 mt-3">
                            {mockAdvertisers.slice(0, 3).map(a => (
                              <div key={a.id} className="text-center group">
                                <div className="w-12 h-12 rounded-full grid place-items-center text-sm border-2 border-white dark:border-slate-700 shadow-sm mx-auto transition-transform group-hover:scale-105" style={{ background: a.color }}>
                                  {a.avatar}
                                </div>
                                <div className="text-[11px] font-bold mt-1.5 truncate max-w-[80px] text-slate-700 dark:text-slate-300">
                                  {a.projectName}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Action Buttons */}
                        {auth?.role === 'advertiser' && (
                          <div className="flex gap-3 mt-6 pt-4 border-t border-slate-100 dark:border-slate-800">
                            <button onClick={() => openInviteFromBrowse(viewedInfluencer)} className="flex-1 py-3 rounded-xl bg-wasla text-white font-bold text-sm hover:bg-waslaHover transition-colors shadow-sm">
                              دعوة لحملة
                            </button>
                            <button onClick={() => { setView('messages'); showToast('افتح المحادثة للتواصل', 'info'); }} className="px-6 py-3 rounded-xl border border-slate-200 dark:border-slate-600 font-bold text-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                              مراسلة
                            </button>
                          </div>
                        )}
                      </div>
                    ) : (
                      /* Advertiser Profile Layout */
                      <div className="bg-white dark:bg-[#182422] rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden shadow-sm p-6">
                        {/* Advertiser Header Style */}
                        <div className="flex items-start gap-5">
                          <div
                            className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl grid place-items-center text-3xl sm:text-4xl border border-slate-200 dark:border-slate-700 shadow-sm shrink-0"
                            style={{ background: viewedAdvertiser.color }}
                          >
                            {viewedAdvertiser.avatar}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-bold text-lg sm:text-xl text-slate-900 dark:text-white">
                              {viewedAdvertiser.projectName}
                            </h3>
                            <ReputationSummary account={viewedAdvertiser} mode={mode} />
                            <div className="text-xs text-slate-500 dark:text-slate-400 mt-1 flex items-center gap-2">
                              <span>{viewedAdvertiser.projectType}</span>
                              {viewedAdvertiser.location && <span>• {viewedAdvertiser.location}</span>}
                            </div>
                            <p className="text-sm text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
                              {viewedAdvertiser.desc}
                            </p>
                          </div>
                        </div>

                        {/* Contact Links Box */}
                        <div className="grid sm:grid-cols-2 gap-2.5 mt-4 p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl text-xs font-medium">
                          <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                            <i className="ri-phone-line text-wasla text-sm"></i>
                            <span>{viewedAdvertiser.phone}</span>
                          </div>
                          <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                            <i className="ri-links-line text-wasla text-sm"></i>
                            <span className="truncate">{viewedAdvertiser.socialUrl}</span>
                          </div>
                        </div>

                        {/* Interests */}
                        <div className="flex flex-wrap gap-1.5 mt-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                          {viewedAdvertiser.interests.map(t => (
                            <span key={t} className="text-xs bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300 px-3 py-1 rounded-full font-bold">
                              #{t}
                            </span>
                          ))}
                        </div>

                        {/* Campaigns */}
                        <div className="mt-6">
                          <h4 className="font-bold text-sm text-slate-800 dark:text-slate-200 mb-3">الحملات العامة</h4>
                          <div className="grid sm:grid-cols-2 gap-3">
                            {campaigns.filter(c => c.advertiserId === viewedAdvertiser.id && ['active', 'in_progress', 'completed'].includes(c.status)).slice(0, 2).map(c => (
                              <div key={c.id} className="border border-slate-200 dark:border-slate-700 rounded-xl p-3.5 card-premium flex flex-col justify-between">
                                <div>
                                  <div className="font-bold text-xs text-slate-900 dark:text-slate-100">{c.title}</div>
                                  <div className="text-[11px] text-slate-500 mt-1">
                                    {c.reels} ريلز • {c.stories} ستوري • {c.posts} منشور • {c.budget.toLocaleString('ar-EG')} ر.س
                                  </div>
                                </div>
                                <div className="mt-3 flex items-center justify-between gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                                  <Badge status={c.status} />
                                  <button onClick={() => { setDetailCamp(c); setShowDetailModal(true); }} className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-600 text-[11px] font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                                    عرض التفاصيل
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Collaborated Influencers */}
                        <div className="mt-6 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
                          <h4 className="font-bold text-sm text-slate-800 dark:text-slate-200">المؤثرون المتعاونون</h4>
                          <div className="flex gap-4 mt-3">
                            {mockInfluencers.slice(0, 3).map(inf => (
                              <div key={inf.id} className="text-center group">
                                <img src={inf.avatar} className="w-12 h-12 rounded-full object-cover border-2 border-white dark:border-slate-700 shadow-sm mx-auto transition-transform group-hover:scale-105" alt="" />
                                <div className="text-[11px] font-bold mt-1.5 truncate max-w-[80px] text-slate-700 dark:text-slate-300">
                                  {inf.name.split(' ')[0]}
                                </div>
                              </div>
                            ))}
                          </div>
                          <p className="text-[11px] text-slate-500 mt-2">سجل التعاونات المكتملة.</p>
                        </div>
                      </div>
                    )}
                  </div>

                ) : (
                  // own profile 
                  <div>
                    <h1 className="text-xl font-bold">ملفي الشخصي {profileComplete && <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full">مكتمل ✓</span>}</h1>
                    <ReputationSummary account={ownReputationAccount} mode={mode} />
                    <p className="text-sm text-slate-500 mt-1">أكمل بياناتك لتتمكن من {auth?.role === 'advertiser' ? 'إنشاء الحملات ودعوة المؤثرين' : 'قبول الدعوات والتقديم على الحملات'}.</p>

                    {!profileComplete && <div className="mt-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-200 px-4 py-3 rounded-xl text-sm">يمكنك التصفح قبل الإكمال — الإجراءات المحجوبة ستطلب الإكمال عند المحاولة.</div>}

                    {auth?.role === 'advertiser' ? (
                      <AdvertiserProfileForm data={profileData} onSave={(d) => { setProfileData(d); setProfileComplete(true); showToast('تم حفظ الملف الشخصي ، يمكنك الآن إنشاء الحملات', 'success'); }} initialName={auth?.name} />
                    ) : (
                      <InfluencerProfileForm data={profileData} onSave={(d) => { setProfileData(d); setProfileComplete(true); showToast('تم حفظ الملف الشخصي ،  ابدأ بالتعاون ', 'success'); }} initialName={auth?.name} />
                    )}

                    {/* collaborating section on own profile */}
                    <div className="bg-white dark:bg-[#182422] rounded-2xl border border-slate-200 dark:border-slate-700 p-5 mt-6">
                      <h3 className="font-bold">{auth?.role === 'advertiser' ? 'المؤثرون المتعاونون' : 'المعلنون المتعاونون'}</h3>
                      <p className="text-xs text-slate-500 mt-1">{auth?.role === 'advertiser' ? 'يظهر هنا سجل تعاوناتك المكتملة مع المؤثرين' : 'يظهر هنا سجل تعاوناتك مع المعلنين'}</p>
                      {mode === 'live' ? (
                        <EmptyState icon="🤝" title="لا يوجد متعاونون بعد" desc="سيظهر هنا شركاؤك بعد إتمام أول تعاون." />
                      ) : (
                        <div className="flex gap-3 mt-4 justify-center">
                          {(auth?.role === 'advertiser' ? mockInfluencers.slice(0, 3) : mockAdvertisers.slice(0, 3)).map(item => {
                            if (auth?.role === 'advertiser') {
                              return <div key={item.id} className="text-center "><img src={item.avatar} className="w-12 h-12 rounded-full object-cover mx-auto border-2 border-white shadow" alt="" /><div className="text-xs font-bold mt-1">{item.name.split(' ')[0]}</div></div>;
                            } else {
                              return <div key={item.id} className="text-center"><div className="w-12 h-12 rounded-full grid place-items-center mx-auto border-2 border-white shadow" style={{ background: item.color }}>{item.avatar}</div><div className="text-xs font-bold mt-1 truncate max-w-[80px]">{item.projectName}</div></div>;
                            }
                          })}
                        </div>
                      )}
                    </div>
                    <div className="bg-white dark:bg-[#182422] rounded-2xl border border-slate-200 dark:border-slate-700 p-5 mt-6 w-full">
                      <button onClick={handleLogout} className="w-full   py-3 text-[13px] font-bold hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 flex items-center justify-center gap-2 hover:rounded-2xl"><i className="ri-logout-box-line"></i> تسجيل الخروج</button>
                    </div>

                  </div>
                )}
              </div>
            )}

            {/* MESSAGES */}
            {view === 'messages' && (
              <div className="view-enter bg-white dark:bg-[#182422] rounded-[18px] border border-slate-200/60 dark:border-slate-700/60 overflow-hidden shadow-soft flex flex-col" style={{ height: 'calc(100dvh - 140px - var(--wasla-nav-offset))', minHeight: '520px' }}>
                {/* mobile conversation switcher */}
                <div className="md:hidden flex border-b border-slate-200 dark:border-slate-700">
                  <button onClick={() => setChatMobileList(true)} className={`flex-1 py-3 text-xs font-bold ${chatMobileList ? 'text-wasla bg-waslaSoft dark:bg-wasla/10' : 'text-muted'}`}>المحادثات</button>
                  <button onClick={() => setChatMobileList(false)} className={`flex-1 py-3 text-xs font-bold ${!chatMobileList ? 'text-wasla bg-waslaSoft dark:bg-wasla/10' : 'text-muted'}`}>المحادثة</button>
                </div>
                <div className="grid md:grid-cols-[320px_1fr] flex-1 min-h-0">
                  {/* list */}
                  <div className={`${chatMobileList ? 'flex' : 'hidden'} md:flex border-l border-slate-200 dark:border-slate-700 flex-col min-h-0`}>
                    <div className="p-4 border-b border-slate-200 dark:border-slate-700">
                      <h2 className="font-bold">الرسائل</h2>
                      <p className="text-xs text-slate-500 mt-1">{auth?.role === 'advertiser' ? 'محادثاتك مع المؤثرين' : 'محادثاتك مع المعلنين'}</p>
                    </div>
                    <div className="flex-1 overflow-auto">
                      {conversations.length === 0 ? <div className="p-8 text-center text-sm text-slate-500">لا توجد محادثات بعد</div> :
                        conversations.map(conv => (
                          <button key={conv.id} onClick={() => { setActiveConv(conv.id); setChatMobileList(false); }} className={`w-full text-start flex gap-3 p-4 border-b border-slate-50 dark:border-slate-700/50 hover:bg-slate-50 dark:hover:bg-slate-800/50 ${activeConv === conv.id ? 'bg-teal-50 dark:bg-teal-900/20' : ''}`}>
                            {conv.avatar.startsWith('http') ? <img src={conv.avatar} className="w-10 h-10 rounded-full object-cover shrink-0" alt="" /> : <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-700 grid place-items-center shrink-0">{conv.avatar}</div>}
                            <div className="flex-1 min-w-0 text-start">
                              <div className="font-bold text-sm flex items-center justify-between gap-2"><span className="truncate">{conv.with}</span><span className="text-[11px] text-slate-500 shrink-0">{conv.time}</span></div>
                              <div className="text-xs text-slate-500 truncate mt-0.5">{conv.lastMsg}</div>
                            </div>
                            {conv.unread > 0 && <span className="w-5 h-5 rounded-full bg-wasla text-white text-[11px] grid place-items-center shrink-0 font-bold">{conv.unread}</span>}
                          </button>
                        ))
                      }
                    </div>
                  </div>
                  {/* conversation */}
                  <div className={`${!chatMobileList ? 'flex' : 'hidden'} md:flex flex-col min-h-0 bg-[#F8FAFC] dark:bg-[#0B0F1A]`}>
                    {(() => {
                      const conv = conversations.find(c => c.id === activeConv);
                      if (!conv) return <div className="flex-1 grid place-items-center text-slate-500 text-sm">اختر محادثة</div>;
                      return (
                        <>
                          <div className="h-14 px-4 flex items-center gap-3 border-b border-slate-200 dark:border-slate-700 bg-white dark:bg-[#182422] shrink-0">
                            <button onClick={() => setChatMobileList(true)} className="md:hidden w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-700 grid place-items-center"><i className="ri-arrow-right-line"></i></button>
                            {conv.avatar.startsWith('http') ? <img src={conv.avatar} className="w-8 h-8 rounded-full object-cover" alt="" /> : <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-700 grid place-items-center">{conv.avatar}</div>}
                            <div className="font-bold text-sm">{conv.with}</div>
                            <span className="text-[11px] bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full">متصل</span>
                          </div>
                          <div className="flex-1 overflow-auto p-4 space-y-3">
                            {conv.messages.map((m, idx) => {
                              if (m.cardType === 'campaign') {
                                const camp = m.campaign;
                                return (
                                  <div key={idx} className="bg-white dark:bg-[#1A2332] rounded-2xl border border-slate-200 dark:border-slate-600 p-4 shadow-sm max-w-[92%] mx-auto">
                                    <div className="flex items-center gap-2 text-wasla font-bold text-sm"><i className="ri-megaphone-line"></i> بطاقة الحملة</div>
                                    <div className="font-bold text-sm mt-2">{camp.title}</div>
                                    <div className="grid grid-cols-3 gap-2 mt-3 text-center">
                                      <div className="bg-slate-50 dark:bg-slate-700 rounded-xl py-2"><div className="text-[10px] text-slate-500">ريلز</div><div className="font-bold">{camp.reels}</div></div>
                                      <div className="bg-slate-50 dark:bg-slate-700 rounded-xl py-2"><div className="text-[10px] text-slate-500">ستوري</div><div className="font-bold">{camp.stories}</div></div>
                                      <div className="bg-slate-50 dark:bg-slate-700 rounded-xl py-2"><div className="text-[10px] text-slate-500">منشور</div><div className="font-bold">{camp.posts}</div></div>
                                    </div>
                                    <div className="flex items-center justify-between mt-3 text-sm">
                                      <span className="font-bold text-wasla">{camp.budget.toLocaleString('ar-EG')} ر.س</span>
                                      <span className="text-slate-500">المدة: {camp.duration}</span>
                                    </div>
                                    {camp.goal && <div className="text-xs text-slate-500 mt-1">الهدف: {camp.goal}</div>}
                                    <button onClick={() => showToast('تم تأكيد بدء العمل — سيتواصل الطرفان لتنفيذ المحتوى', 'success')} className="w-full mt-3 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-sm">تأكيد وبدء العمل</button>
                                  </div>
                                );
                              }
                              if (m.cardType === 'negotiation') {
                                const isMe = m.sender === 'me';
                                const statusLabels = { pending: 'بانتظار الرد', accepted: 'مقبول ✓', rejected: 'مرفوض', cancelled: 'ملغى' };
                                const statusColors = { pending: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300', accepted: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300', rejected: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300', cancelled: 'bg-zinc-100 text-zinc-600 dark:bg-zinc-700 dark:text-zinc-300' };
                                return (
                                  <div key={idx} className="bg-white dark:bg-[#1A2332] rounded-2xl border border-slate-200 dark:border-slate-600 overflow-hidden shadow-sm max-w-[96%] mx-auto">
                                    <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/30">
                                      <span className="font-bold text-sm flex items-center gap-1"><i className="ri-exchange-line"></i> عرض تفاوضي</span>
                                      <span className={`text-[11px] font-bold px-2 py-1 rounded-full ${statusColors[m.status]}`}>{statusLabels[m.status]}</span>
                                    </div>
                                    <div className="grid grid-cols-2 gap-3 p-4">
                                      <div className="rounded-xl border border-slate-200 dark:border-slate-600 p-3 bg-slate-50 dark:bg-slate-800/50">
                                        <div className="text-[11px] font-bold text-slate-500">العرض الأصلي</div>
                                        <div className="text-xs mt-2 space-y-1">
                                          <div>ريلز: <b>{m.original.reels}</b> • ستوري: <b>{m.original.stories}</b> • منشور: <b>{m.original.posts}</b></div>
                                          <div>الميزانية: <b>{m.original.budget.toLocaleString('ar-EG')} ر.س</b></div>
                                          <div>المدة: <b>{m.original.duration}</b></div>
                                        </div>
                                      </div>
                                      <div className="rounded-xl border-2 border-wasla/20 p-3 bg-teal-50/50 dark:bg-teal-900/10">
                                        <div className="text-[11px] font-bold text-wasla">العرض المقترح</div>
                                        <div className="text-xs mt-2 space-y-1">
                                          <div>ريلز: <b>{m.proposed.reels}</b> • ستوري: <b>{m.proposed.stories}</b> • منشور: <b>{m.proposed.posts}</b></div>
                                          <div>الميزانية: <b>{m.proposed.budget.toLocaleString('ar-EG')} ر.س</b></div>
                                          <div>المدة: <b>{m.proposed.duration}</b></div>
                                        </div>
                                      </div>
                                    </div>
                                    {m.status === 'pending' && (
                                      <div className="px-4 pb-4 flex gap-2">
                                        {!isMe ? (
                                          <>
                                            <button onClick={() => handleNegotiationAction(conv.id, idx, 'accept')} className="flex-1 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold">قبول</button>
                                            <button onClick={() => handleNegotiationAction(conv.id, idx, 'reject')} className="flex-1 py-2 rounded-xl bg-red-500 hover:bg-red-600 text-white text-xs font-bold">رفض</button>
                                            <button onClick={() => openNegotiate(m.proposed, conv.id)} className="flex-1 py-2 rounded-xl border border-slate-200 dark:border-slate-600 text-xs font-bold hover:bg-slate-50 dark:hover:bg-slate-700">تفاوض</button>
                                          </>
                                        ) : (
                                          <>
                                            <button onClick={() => handleNegotiationAction(conv.id, idx, 'cancel')} className="flex-1 py-2 rounded-xl bg-zinc-100 dark:bg-zinc-700 text-xs font-bold hover:bg-zinc-200">إلغاء</button>
                                            <button onClick={() => openNegotiate(m.proposed, conv.id)} className="flex-1 py-2 rounded-xl border border-wasla text-wasla text-xs font-bold hover:bg-teal-50 dark:hover:bg-teal-900/20">تعديل</button>
                                          </>
                                        )}
                                      </div>
                                    )}
                                  </div>
                                );
                              }
                              // normal message
                              const isMe = m.from === 'me';
                              return (
                                <div key={idx} className={`flex ${isMe ? 'justify-start' : 'justify-end'}`}>
                                  <div className={`max-w-[72%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed shadow-sm ${isMe ? 'bg-wasla text-white rounded-br-sm' : 'bg-white dark:bg-[#1A2332] border border-slate-200 dark:border-slate-700 rounded-bl-sm'}`}>
                                    {m.text}
                                    <div className={`text-[10px] mt-1 ${isMe ? 'text-white/70' : 'text-slate-500'}`}>{m.time}</div>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                          <div className="p-3 bg-white dark:bg-[#182422] border-t border-slate-200 dark:border-slate-700 flex gap-2 shrink-0">
                            <input value={chatInput} onChange={e => setChatInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleSendMessage()} placeholder="اكتب رسالة..." className="flex-1 rounded-full border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-800 px-4 py-2.5 text-sm outline-none focus:border-wasla focus:bg-white dark:focus:bg-slate-700" />
                            <button onClick={handleSendMessage} className="w-10 h-10 rounded-full bg-wasla text-white grid place-items-center hover:bg-waslaHover shrink-0"><i className="ri-send-plane-fill"></i></button>
                          </div>
                        </>
                      );
                    })()}
                  </div>
                </div>
              </div>
            )}

          </div>
        </main>

        {/* MOBILE BOTTOM NAV — dir ltr guarantees physical left→right order */}
        {auth && (
          <nav aria-label="التنقل الرئيسي" dir="ltr" className="wasla-bottom-nav lg:hidden fixed inset-x-0 bottom-0 z-40 bg-white dark:bg-[#182422] border-t border-slate-200 dark:border-slate-700">
            <ul className="grid grid-cols-5 h-[var(--bottom-nav-h)]">
              {(auth.role === 'advertiser' ? [
                { id: 'profile', label: 'الصفحة الشخصية', icon: 'ri-user-line' },
                { id: 'browseAdvertisers', label: 'استكشاف المعلنين', icon: 'ri-store-2-line' },
                { id: 'myCampaigns', label: 'حملاتي', icon: 'ri-megaphone-line' },
                { id: 'browseInfluencers', label: 'استكشاف المؤثرين', icon: 'ri-team-line' },
                { id: 'dashboard', label: 'لوحة التحكم', icon: 'ri-dashboard-line' },
              ] : [
                { id: 'profile', label: 'الصفحة الشخصية', icon: 'ri-user-line' },
                { id: 'browseInfluencers', label: 'استكشاف المؤثرين', icon: 'ri-team-line' },
                { id: 'browseAdvertisers', label: 'استكشاف المعلنين', icon: 'ri-store-2-line' },
                { id: 'exploreCampaigns', label: 'استكشاف الحملات', icon: 'ri-compass-3-line' },
                { id: 'dashboard', label: 'لوحة التحكم', icon: 'ri-dashboard-line' },
              ]).map(it => {
                const viewingOther = !!(viewedAdvertiser || viewedInfluencer);
                const active = it.id === 'profile' ? (view === 'profile' && !viewingOther) : view === it.id;
                return (
                  <li key={it.id} className="min-w-0">
                    <button onClick={() => { setViewedAdvertiser(null); setViewedInfluencer(null); setProfileOrigin(null); setView(it.id); }} aria-current={active ? 'page' : undefined} className={`w-full h-full flex flex-col items-center justify-center gap-1 px-0.5 transition ${active ? 'text-wasla font-bold' : 'text-muted dark:text-slate-300 font-medium'}`}>
                      <span className={`w-11 h-7 rounded-full grid place-items-center text-[19px] ${active ? 'bg-waslaSoft dark:bg-wasla/25' : ''}`}><i className={active ? it.icon.replace('-line', '-fill') : it.icon}></i></span>
                      <span dir="rtl" className="text-[10.5px] leading-[1.2] text-center line-clamp-2">{it.label}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>
        )}

        {/* CREATE / EDIT CAMPAIGN MODAL */}
        <Modal open={showCreateModal} onClose={() => setShowCreateModal(false)} title={editingCampaign ? 'تعديل الحملة' : 'إنشاء حملة جديدة'} wide>
          <div className="space-y-4">
            <div>
              <label className="text-xs font-bold">اسم الحملة <span className="text-red-500">*</span></label>
              <input value={formCamp.title} onChange={e => setFormCamp({ ...formCamp, title: e.target.value })} placeholder="مثال: إطلاق منيو الصيف الجديد" className="mt-1 w-full rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 px-4 py-3 text-sm outline-none focus:border-wasla" />
            </div>
            <div className="grid grid-cols-3 gap-3">
              {[
                { key: 'reels', label: 'ريلز' },
                { key: 'stories', label: 'ستوري' },
                { key: 'posts', label: 'منشور' },
              ].map(f => {
                const v = formCamp[f.key] || 0;
                return (
                  <div key={f.key} className="rounded-xl border border-slate-200 dark:border-slate-600 p-3 text-center bg-slate-50/50 dark:bg-slate-800/30">
                    <div className="text-xs font-bold">{f.label}</div>
                    <div className="flex items-center justify-center gap-2 mt-2">
                      <button onClick={() => setFormCamp({ ...formCamp, [f.key]: Math.max(0, v - 1) })} disabled={v === 0} className={`w-8 h-8 rounded-full border grid place-items-center ${v === 0 ? 'bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-400 cursor-not-allowed opacity-50' : 'bg-white dark:bg-slate-700 border-slate-200 dark:border-slate-600 hover:bg-slate-50'}`}>−</button>
                      <span className="w-8 text-center font-bold">{v}</span>
                      <button onClick={() => setFormCamp({ ...formCamp, [f.key]: v + 1 })} className="w-8 h-8 rounded-full bg-wasla text-white grid place-items-center hover:bg-waslaHover">+</button>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold">الميزانية المقترحة (ر.س) <span className="text-red-500">*</span></label>
                <input type="text" inputMode="numeric" pattern="[0-9]*" value={formCamp.budget} onKeyDown={onlyDigitsKey} onPaste={e => onDigitsPaste(e, v => setFormCamp({ ...formCamp, budget: v }))} onChange={e => setFormCamp({ ...formCamp, budget: sanitizeDigits(e.target.value) })} placeholder="مثال: 4500" className="mt-1 w-full rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 px-4 py-3 text-sm outline-none focus:border-wasla" />
                <p className="text-[11px] text-slate-500 mt-1">سعر تجريبي — ليس تسعيراً ملزماً أو مرتبطاً بعدد المتابعين</p>
              </div>
              <div>
                <label className="text-xs font-bold">المدة</label>
                <select value={formCamp.duration} onChange={e => setFormCamp({ ...formCamp, duration: e.target.value })} className="mt-1 w-full rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 px-4 py-3 text-sm">
                  <option>هذا الأسبوع</option><option>أسبوعان</option><option>شهر</option>
                </select>
              </div>
            </div>
            <div>
              <label className="text-xs font-bold">هدف الحملة</label>
              <select value={formCamp.goal} onChange={e => setFormCamp({ ...formCamp, goal: e.target.value })} className="mt-1 w-full rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 px-4 py-3 text-sm">
                <option>زيادة المبيعات</option><option>زيادة المتابعين</option><option>الوعي بالعلامة</option>
              </select>
            </div>
            {formErr && <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 px-4 py-3 rounded-xl text-xs font-bold">{formErr}</div>}
            <div className="flex gap-2 pt-2">
              <button onClick={() => handleSaveCampaign(false)} className="flex-1 py-3 rounded-xl bg-wasla text-white font-bold text-sm hover:bg-waslaHover">إطلاق الحملة</button>
              <button onClick={() => handleSaveCampaign(true)} className="flex-1 py-3 rounded-xl border border-slate-200 dark:border-slate-600 font-bold text-sm hover:bg-slate-50 dark:hover:bg-slate-800">حفظ كمسودة</button>
              <button onClick={() => setShowCreateModal(false)} className="px-5 py-3 rounded-xl bg-slate-100 dark:bg-slate-700 font-bold text-sm hover:bg-slate-200">إلغاء</button>
            </div>
          </div>
        </Modal>

        {/* INVITE LIST (from campaign) — 12.3 + 13.x */}
        <Modal open={showInviteList} onClose={() => { setShowInviteList(false); setInviteSearch(''); }} title={`دعوة مؤثرين — "${inviteCampaign?.title}"`} wide>
          <p className="text-xs text-slate-500 mb-2">اختر مؤثراً لدعوته مباشرة إلى هذه الحملة. الحملة محددة مسبقاً من البطاقة التي ضغطت عليها.</p>
          <div className="relative mb-3">
            <i className="ri-search-line absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm"></i>
            <input value={inviteSearch} onChange={e => setInviteSearch(e.target.value)} placeholder="ابحث بالاسم أو الاهتمام..." className="w-full pr-9 ps-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 text-sm outline-none focus:border-wasla" />
          </div>
          <div className="space-y-2 max-h-[42vh] overflow-auto">
            {(() => {
              const q = inviteSearch.trim(); const list = [...mockInfluencers].sort((a, b) => { const ai = profileData?.interests?.some(t => a.interests.includes(t)) ? 0 : 1; const bi = profileData?.interests?.some(t => b.interests.includes(t)) ? 0 : 1; return ai - bi; }).filter(inf => !q || inf.name.includes(q) || (inf.interests || []).some(t => t.includes(q)) || getInfHandle(inf).includes(q)); if (list.length === 0) return <div className="text-center text-sm text-slate-500 py-6">لا نتائج — جرّب كلمات مختلفة</div>; return list.map(inf => (
                <div key={inf.id} className="flex items-center gap-3 p-3 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/50">
                  <img src={inf.avatar} className="w-10 h-10 rounded-full object-cover" alt="" />
                  <div className="flex-1 min-w-0">
                    <div className="font-bold text-sm truncate">{inf.name}</div>
                    <div className="text-xs text-slate-500 truncate">{getInfHandle(inf)} • {(() => { const v = inf.followers; if (typeof v === 'object') return [v.ig && `${formatNum(Number(v.ig))}`, v.fb && `${formatNum(Number(v.fb))}`].filter(Boolean).join(' • '); return formatNum(v); })()} متابع • {inf.interests.join('، ')}</div>
                  </div>
                  <button onClick={() => setInviteConfirm({ inf, camp: inviteCampaign, pkg: null })} className="px-4 py-1.5 rounded-full bg-wasla text-white text-xs font-bold hover:bg-waslaHover shrink-0">دعوة</button>
                </div>
              ));
            })()}
          </div>
          {inviteConfirm && (
            <div className="mt-4 p-4 rounded-xl border-2 border-wasla/30 bg-waslaSoft/40 dark:bg-wasla/10 flex items-center justify-between gap-3">
              <span className="text-sm">
                تأكيد دعوة <b>{inviteConfirm.inf.name}</b> لحملة "{inviteConfirm.camp.title}"؟
              </span>
              <span className="flex-colum gap-2 shrink-0">
                <button onClick={() => { const { inf, camp } = inviteConfirm; 
                setInviteConfirm(null); 
                confirmInvite(inf, camp); 
                setInviteSearch(''); }} 
                className="flex-colum px-4 py-2 rounded-xl bg-wasla text-white text-xs font-bold">
                  تأكيد
                </button>
                <button onClick={() => setInviteConfirm(null)} className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-600 text-xs font-bold">
                  إلغاء
                </button>
              </span>
            </div>
          )}
        </Modal>

        {/* CAMPAIGN PICKER (from browse) */}
        <Modal open={showCampaignPicker} onClose={() => { setShowCampaignPicker(false); setCampaignPickerSearch(''); setInviteConfirm(null); }} title={pendingPackage ? `اختر حملة لطلب التعاون عبر باقة "${pendingPackage?.name}"` : `اختر حملة لدعوة ${pendingInfluencer?.name}`}>
          <p className="text-xs text-slate-500 mb-2">{pendingPackage ? `سيتم إرسال طلب تعاون باستخدام الباقة المحددة والحملة التي تختارها.` : `اختر إحدى حملاتك لإرسال الدعوة إلى هذا المؤثر.`}</p>
          <div className="relative mb-3">
            <i className="ri-search-line absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm"></i>
            <input value={campaignPickerSearch} onChange={e => setCampaignPickerSearch(e.target.value)} placeholder="ابحث باسم الحملة..." className="w-full pr-9 ps-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 text-sm outline-none focus:border-wasla" />
          </div>
          {myCampaigns.filter(c => c.status !== 'draft' && c.status !== 'cancelled').length === 0 ? (
            <div className="text-center py-8">
              <p className="text-sm text-slate-500">لا توجد حملات متاحة — أنشئ حملة أولاً.</p>
              <button onClick={() => { setShowCampaignPicker(false); setCampaignPickerSearch(''); handleCreateCampaign(); }} className="mt-3 bg-wasla text-white px-5 py-2 rounded-xl text-sm font-bold">إنشاء حملة</button>
            </div>
          ) : (
            <>
              <div className="space-y-2 max-h-[40vh] overflow-auto">
                {(() => {
                  const q = campaignPickerSearch.trim(); const list = myCampaigns.filter(c => c.status !== 'draft' && c.status !== 'cancelled').filter(c => !q || c.title.includes(q)).slice(); if (list.length === 0) return <div className="text-center text-sm text-slate-500 py-6">لا نتائج</div>; return list.map(c => (
                    <button key={c.id} onClick={() => setInviteConfirm({ inf: pendingInfluencer, camp: c, pkg: pendingPackage })} className={`w-full text-start p-3 rounded-xl border flex items-center justify-between ${inviteConfirm?.camp?.id === c.id ? 'border-wasla bg-waslaSoft/60 dark:bg-wasla/10' : 'border-slate-200 dark:border-slate-700 hover:border-wasla hover:bg-teal-50/50 dark:hover:bg-teal-900/10'}`}>
                      <div>
                        <div className="font-bold text-sm">{c.title}</div>
                        <div className="text-xs text-slate-500">{c.reels} ريلز • {c.stories} ستوري • {c.posts} منشور • {c.budget.toLocaleString('ar-EG')} ر.س</div>
                      </div>
                      <Badge status={c.status} />
                    </button>
                  ));
                })()}
              </div>
              {inviteConfirm && (
                <div className="mt-4 p-4 rounded-xl border-2 border-wasla/30 bg-waslaSoft/40 dark:bg-wasla/10 flex-colum items-center justify-between gap-3">
                  <span className="text-sm  ">تأكيد إرسال الدعوة لحملة "{inviteConfirm.camp.title}"؟</span>
                  <div className="flex gap-2 shrink-0 mt-2 justify-center ">
                    <button onClick={() => { const { inf, camp, pkg } = inviteConfirm; setInviteConfirm(null); setCampaignPickerSearch(''); if (pkg) confirmPackageRequest(camp); else confirmInvite(inf, camp); }} className="px-4 py-2 rounded-xl bg-wasla text-white text-xs font-bold">
                      تأكيد
                    </button>
                    <button onClick={() => setInviteConfirm(null)} className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-600 text-xs font-bold">
                      إلغاء
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </Modal>

        {/* NEGOTIATE EDITOR */}
        <Modal open={showNegotiateEditor} onClose={() => setShowNegotiateEditor(false)} title="تعديل العرض — ابدأ من العرض الحالي">
          <p className="text-xs text-slate-500 mb-4">عدّل السعر أو الكميات. سيظهر العرض المعدّل كبطاقة تفاوضية جديدة في المحادثة.</p>
          <div className="grid grid-cols-3 gap-3">
            {[
              { k: 'reels', l: 'ريلز' },
              { k: 'stories', l: 'ستوري' },
              { k: 'posts', l: 'منشور' },
            ].map(f => {
              const v = negoForm[f.k] || 0;
              return (
                <div key={f.k} className="rounded-xl border border-slate-200 dark:border-slate-600 p-3 text-center">
                  <div className="text-xs font-bold">{f.l}</div>
                  <div className="flex items-center justify-center gap-2 mt-2">
                    <button onClick={() => setNegoForm({ ...negoForm, [f.k]: Math.max(0, v - 1) })} disabled={v === 0} className={`w-7 h-7 rounded-full border grid place-items-center ${v === 0 ? 'bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-400 opacity-50 cursor-not-allowed' : 'bg-white dark:bg-slate-700 border-slate-200 dark:border-slate-600'}`}>−</button>
                    <span className="w-6 text-center font-bold text-sm">{v}</span>
                    <button onClick={() => setNegoForm({ ...negoForm, [f.k]: v + 1 })} className="w-7 h-7 rounded-full bg-wasla text-white grid place-items-center">+</button>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="grid sm:grid-cols-2 gap-3 mt-4">
            <div>
              <label className="text-xs font-bold">الميزانية (ر.س)</label>
              <input type="text" inputMode="numeric" pattern="[0-9]*" value={negoForm.budget} onKeyDown={onlyDigitsKey} onPaste={e => onDigitsPaste(e, v => setNegoForm({ ...negoForm, budget: v }))} onChange={e => setNegoForm({ ...negoForm, budget: sanitizeDigits(e.target.value) })} className="mt-1 w-full rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 px-4 py-2.5 text-sm outline-none focus:border-wasla" />
            </div>
            <div>
              <label className="text-xs font-bold">المدة</label>
              <select value={negoForm.duration} onChange={e => setNegoForm({ ...negoForm, duration: e.target.value })} className="mt-1 w-full rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 px-4 py-2.5 text-sm">
                <option>هذا الأسبوع</option><option>أسبوعان</option><option>شهر</option>
              </select>
            </div>
          </div>
          <div className="flex gap-2 mt-6">
            <button onClick={sendCounterOffer} className="flex-1 py-3 rounded-xl bg-wasla text-white font-bold text-sm hover:bg-waslaHover">إرسال العرض المعدّل</button>
            <button onClick={() => setShowNegotiateEditor(false)} className="px-6 py-3 rounded-xl border border-slate-200 dark:border-slate-600 font-bold text-sm">إلغاء</button>
          </div>
        </Modal>

        {/* PROFILE COMPLETION GATE */}
        <Modal open={showProfileCompleteModal} onClose={() => setShowProfileCompleteModal(false)} title="إكمال الملف الشخصي مطلوب">
          <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl px-4 py-3 text-sm text-amber-800 dark:text-amber-200 flex gap-2">
            <i className="ri-information-line shrink-0 mt-0.5"></i> <span>{profileCompleteReason}</span>
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-300 mt-4">يمكنك المتابعة للتصفح، لكن هذا الإجراء يتطلب ملفاً مكتملاً. هل تود إكماله الآن؟</p>
          <div className="flex gap-2 mt-6">
            <button onClick={() => { setShowProfileCompleteModal(false); setView('profile'); }} className="flex-1 py-3 rounded-xl bg-wasla text-white font-bold text-sm">إكمال الملف الآن</button>
            <button onClick={() => setShowProfileCompleteModal(false)} className="px-6 py-3 rounded-xl border border-slate-200 dark:border-slate-600 font-bold text-sm">لاحقاً</button>
          </div>
        </Modal>

        {/* LOGOUT CONFIRM */}
        <Modal open={showLogoutConfirm} onClose={() => setShowLogoutConfirm(false)} title="تأكيد تسجيل الخروج">
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">هل أنت متأكد من تسجيل الخروج؟</p>
          <div className="flex gap-2 mt-6">
            <button onClick={doLogout} className="flex-1 py-3 rounded-xl bg-wasla text-white font-bold text-sm hover:bg-waslaHover">تأكيد</button>
            <button onClick={() => setShowLogoutConfirm(false)} className="px-6 py-3 rounded-xl border border-slate-200 dark:border-slate-600 font-bold text-sm">إلغاء</button>
          </div>
        </Modal>
        {/* CANCEL CAMPAIGN CONFIRM */}
        <Modal open={!!cancelTarget} onClose={() => setCancelTarget(null)} title="تأكيد إلغاء الحملة">
          {cancelTarget && (
            <div>
              <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl px-4 py-3 text-sm text-amber-800 dark:text-amber-200">سيتم إلغاء حملة "{cancelTarget.title}" — لا يمكن التراجع بعد التأكيد.</div>
              <div className="flex gap-2 mt-6">
                <button onClick={doCancelCampaign} className="flex-1 py-3 rounded-xl bg-danger text-white font-bold text-sm hover:bg-red-600">تأكيد الإلغاء</button>
                <button onClick={() => setCancelTarget(null)} className="px-6 py-3 rounded-xl border border-slate-200 dark:border-slate-600 font-bold text-sm">إلغاء</button>
              </div>
            </div>
          )}
        </Modal>

        <Toast msg={toast} type={toastType} onClose={() => setToast(null)} />

        {/* CAMPAIGN DETAIL MODAL — shared (Explore + suggested + advertiser profile) */}
        <Modal open={showDetailModal} onClose={() => setShowDetailModal(false)} title={detailCamp?.title || 'تفاصيل الحملة'} wide>
          {detailCamp && (() => {
            const adv = mockAdvertisers.find(a => a.id === detailCamp.advertiserId);
            const isActive = detailCamp.status === 'active';
            return (
              <div className="space-y-4">
                <div className="flex items-center gap-2 flex-wrap"><Badge status={detailCamp.status} /> <span className="text-xs text-slate-500">{detailCamp.advertiserName} • {detailCamp.createdAt}</span> {detailCamp.category && <span className="text-xs bg-waslaSoft dark:bg-wasla/15 text-wasla px-2.5 py-1 rounded-full font-bold border border-teal-200 dark:border-teal-800">{detailCamp.category}</span>}</div>
                {adv && <div className="text-xs text-slate-600 dark:text-slate-300 flex items-center gap-1.5"><i className="ri-store-2-line text-slate-400"></i> {adv.projectName} • {adv.projectType} {adv.location && <><span className="text-slate-300">•</span> <i className="ri-map-pin-line text-slate-400"></i> {adv.location}</>} {detailCamp.addressDetail && <span className="text-slate-500">— {detailCamp.addressDetail}</span>}</div>}
                {!adv && detailCamp.address && <div className="text-xs text-slate-600 dark:text-slate-300 flex items-center gap-1.5"><i className="ri-map-pin-line text-slate-400"></i> {detailCamp.address}{detailCamp.addressDetail ? ` — ${detailCamp.addressDetail}` : ''}</div>}
                {detailCamp.desc && <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-800/50 rounded-xl p-3 border border-slate-100 dark:border-slate-700">{detailCamp.desc}</p>}
                <div className="flex gap-1.5 flex-wrap">
                  <span className="text-xs font-bold bg-slate-100 dark:bg-slate-700 px-2.5 py-1 rounded-full">{detailCamp.reels} ريلز</span>
                  <span className="text-xs font-bold bg-slate-100 dark:bg-slate-700 px-2.5 py-1 rounded-full">{detailCamp.stories} ستوري</span>
                  <span className="text-xs font-bold bg-slate-100 dark:bg-slate-700 px-2.5 py-1 rounded-full">{detailCamp.posts} منشور</span>
                </div>
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="bg-slate-50 dark:bg-slate-800 rounded-xl py-3"><div className="text-[10px] text-slate-500 font-bold">الميزانية</div><div className="text-sm font-bold text-wasla">{detailCamp.budget.toLocaleString('ar-EG')} ر.س</div></div>
                  <div className="bg-slate-50 dark:bg-slate-800 rounded-xl py-3"><div className="text-[10px] text-slate-500 font-bold">المدة</div><div className="text-sm font-bold">{detailCamp.duration}</div></div>
                  <div className="bg-slate-50 dark:bg-slate-800 rounded-xl py-3"><div className="text-[10px] text-slate-500 font-bold">الهدف</div><div className="text-sm font-bold">{detailCamp.goal}</div></div>
                </div>
                {!isActive && <div className="text-xs font-bold text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl px-3 py-2">هذه الحملة {detailCamp.status === 'completed' ? 'مكتملة' : detailCamp.status === 'cancelled' ? 'ملغاة' : detailCamp.status === 'in_progress' ? 'قيد التنفيذ' : 'غير متاحة'} — غير متاحة للتقديم أو التفاوض</div>}
                <div className="flex gap-2 pt-2">
                  {auth?.role === 'influencer' && isActive ? (
                    <>
                      <button onClick={() => { const c = detailCamp; const ok = handleApplyToCampaign(c); if (ok !== false) setShowDetailModal(false); }} className="flex-1 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-sm btn-primary">التقديم على الحملة</button>
                      <button onClick={() => { const c = detailCamp; setShowDetailModal(false); setTimeout(() => openNegotiate(c, c.advertiserId || c.id), 260); }} className="flex-1 py-3 rounded-xl border-2 border-wasla text-wasla font-bold text-sm hover:bg-waslaSoft dark:hover:bg-wasla/10">التفاوض</button>
                      <button onClick={() => setShowDetailModal(false)} className="px-6 py-3 rounded-xl border border-slate-200 dark:border-slate-600 font-bold text-sm">إغلاق</button>
                    </>
                  ) : auth?.role === 'influencer' ? (
                    <button onClick={() => setShowDetailModal(false)} className="flex-1 py-3 rounded-xl border border-slate-200 dark:border-slate-600 font-bold text-sm">إغلاق</button>
                  ) : (
                    <button onClick={() => setShowDetailModal(false)} className="flex-1 py-3 rounded-xl border border-slate-200 dark:border-slate-600 font-bold text-sm">إغلاق</button>
                  )}
                </div>
              </div>
            );
          })()}
        </Modal>
      </div>
    </div>
  );
}
// ============ PROFILE FORMS ============
function AdvertiserProfileForm({ data, onSave, initialName }) {
  const [form, setForm] = useState(data || { projectName: initialName || '', projectType: 'مطاعم ومقاهي', otherType: '', location: '', phone: '', socialChoice: 'instagram', socialUrl: '', interests: [] });
  const [err, setErr] = useState({});
  const interestsOptions = INTERESTS;
  const toggleInterest = (tag) => setForm(f => ({ ...f, interests: f.interests.includes(tag) ? f.interests.filter(x => x !== tag) : [...f.interests, tag] }));
  const fieldCls = (hasErr) => `mt-1.5 w-full rounded-2xl border px-4 py-3 text-[13px] outline-none focus-ring bg-white dark:bg-slate-800 transition ${hasErr ? 'border-red-400 bg-red-50/30' : 'border-slate-200 dark:border-slate-600'}`;
  const submit = () => {
    const e = {};
    if (!form.projectName.trim()) e.projectName = 'اسم المشروع مطلوب';
    if (!form.location.trim()) e.location = 'موقع المشروع/المتجر مطلوب';
    if (!form.phone.trim()) e.phone = 'رقم الجوال مطلوب';
    else if (!/^09\d{8}$/.test(form.phone.replace(/\s/g, ''))) e.phone = 'رقم جوال غير صحيح (مثال: 0955123456)';
    if (form.projectType === 'أخرى' && !form.otherType.trim()) e.otherType = 'حدد نوع المشروع';
    if (form.socialChoice !== 'none' && form.socialChoice && !form.socialUrl.trim()) e.socialUrl = 'رابط التواصل مطلوب أو اختر "لا يوجد"';
    setErr(e);
    if (Object.keys(e).length) return;
    onSave(form);
  };
  return (
    <div className="bg-white dark:bg-[#182422] rounded-[18px] border border-slate-200/60 dark:border-slate-700/60 p-6 mt-4 shadow-soft">
      <h3 className="font-bold tracking-tight">بيانات المعلن</h3>
      <div className="grid sm:grid-cols-2 gap-4 mt-4">
        <div>
          <label className="text-xs font-bold">اسم المشروع <span className="text-red-500">*</span></label>
          <input value={form.projectName} onChange={e => setForm({ ...form, projectName: e.target.value })} placeholder="مثال: مطعم لحظة" className={`mt-1 w-full rounded-xl border px-4 py-2.5 text-sm outline-none focus:border-wasla bg-white dark:bg-slate-800 ${err.projectName ? 'border-red-400' : 'border-slate-200 dark:border-slate-600'}`} />
          {err.projectName && <span className="text-[11px] text-red-600">{err.projectName}</span>}
        </div>
        <div>
          <label className="text-xs font-bold">نوع المشروع <span className="text-red-500">*</span></label>
          <select value={form.projectType} onChange={e => setForm({ ...form, projectType: e.target.value })} className="mt-1 w-full rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 px-4 py-2.5 text-sm">
            <option>مطاعم ومقاهي</option><option>أزياء وتجميل</option><option>تقنية</option><option>عطور وبخور</option><option>رياضة ولياقة</option><option>أخرى</option>
          </select>
          {form.projectType === 'أخرى' && (
            <input value={form.otherType} onChange={e => setForm({ ...form, otherType: e.target.value })} placeholder="حدد النوع" className={`mt-2 w-full rounded-xl border px-4 py-2.5 text-sm ${err.otherType ? 'border-red-400' : 'border-slate-200 dark:border-slate-600'} bg-white dark:bg-slate-800`} />
          )}
          {err.otherType && <span className="text-[11px] text-red-600">{err.otherType}</span>}
        </div>
        <div>
          <label className="text-xs font-bold">موقع المشروع/المتجر <span className="text-red-500">*</span></label>
          <input value={form.location} onChange={e => setForm({ ...form, location: e.target.value })} placeholder="مثال: حمص — الحميدية" className={`mt-1 w-full rounded-xl border px-4 py-2.5 text-sm outline-none focus:border-wasla bg-white dark:bg-slate-800 ${err.location ? 'border-red-400' : 'border-slate-200 dark:border-slate-600'}`} />
          {err.location && <span className="text-[11px] text-red-600">{err.location}</span>}
        </div>
        <div>
          <label className="text-xs font-bold">رقم الجوال <span className="text-red-500">*</span></label>
          <input type="text" inputMode="numeric" pattern="[0-9]*" maxLength="10" value={form.phone} onKeyDown={onlyDigitsKey} onPaste={e => onDigitsPaste(e, v => setForm({ ...form, phone: v }))} onChange={e => setForm({ ...form, phone: sanitizeDigits(e.target.value) })} placeholder="09xxxxxxxx" className={`mt-1 w-full rounded-xl border px-4 py-2.5 text-sm outline-none focus:border-wasla bg-white dark:bg-slate-800 ${err.phone ? 'border-red-400' : 'border-slate-200 dark:border-slate-600'}`} />
          {err.phone && <span className="text-[11px] text-red-600">{err.phone}</span>}
        </div>
        <div className="sm:col-span-2">
          <label className="text-xs font-bold">وسيلة التواصل عبر السوشال</label>
          <div className="flex gap-2 mt-1">
            {[
              { v: 'facebook', l: 'رابط فيسبوك' },
              { v: 'instagram', l: 'رابط إنستغرام' },
              { v: 'none', l: 'لا يوجد' },
            ].map(o => (
              <button key={o.v} onClick={() => setForm({ ...form, socialChoice: o.v })} className={`flex-1 py-2.5 rounded-xl border font-bold text-xs ${form.socialChoice === o.v ? 'bg-wasla text-white border-wasla' : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-600 hover:bg-slate-50'}`}>{o.l}</button>
            ))}
          </div>
          {form.socialChoice !== 'none' && (
            <input value={form.socialUrl} onChange={e => setForm({ ...form, socialUrl: e.target.value })} placeholder={form.socialChoice === 'instagram' ? '@username أو رابط إنستغرام' : 'رابط فيسبوك'} className={`mt-2 w-full rounded-xl border px-4 py-2.5 text-sm bg-white dark:bg-slate-800 ${err.socialUrl ? 'border-red-400' : 'border-slate-200 dark:border-slate-600'}`} />
          )}
          {err.socialUrl && <span className="text-[11px] text-red-600">{err.socialUrl}</span>}
          <p className="text-[11px] text-slate-500 mt-1">اختر واحدة فقط — أو "لا يوجد" إذا لم تتوفر.</p>
        </div>
        <div className="sm:col-span-2">
          <label className="text-xs font-bold"><p className="mb-1 ">  الاهتمامات / مجال العمل </p><p className="text-[9px] text-gray-400"> اختر  اهتمامات مشروعك لمطابقت حسابك مع مؤثر مناسب</p></label>
          <div className="flex flex-wrap gap-2 mt-2">
            {interestsOptions.map(tag => (
              <button key={tag} onClick={() => toggleInterest(tag)} className={`px-3 py-1.5 rounded-full text-xs font-bold border ${form.interests.includes(tag) ? 'bg-wasla text-white border-wasla' : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-600 hover:bg-slate-50'}`}>{tag}</button>
            ))}
          </div>
        </div>
      </div>
      <button onClick={submit} className="w-full mt-6 py-3 rounded-xl bg-wasla text-white font-bold text-sm hover:bg-waslaHover">حفظ الملف</button>
      <p className="text-[11px] text-slate-500 text-center mt-2">الحقول المميزة بـ <span className="text-red-500">*</span> مطلوبة</p>
    </div>
  );
}
function InfluencerProfileForm({ data, onSave, initialName }) {
  const [form, setForm] = useState(() => { const d = data; if (d) return d; return { fullName: initialName || '', phone: '', platforms: { instagram: true, facebook: false }, handles: { ig: '', fb: '' }, followers: { ig: '', fb: '' }, interests: [], packages: [], works: ['', '', ''] }; });
  const [err, setErr] = useState({});
  const interestsOptions = INTERESTS;
  const toggleInterest = (tag) => setForm(f => ({ ...f, interests: f.interests.includes(tag) ? f.interests.filter(x => x !== tag) : [...f.interests, tag] }));
  const togglePlatform = (p) => setForm(f => ({ ...f, platforms: { ...f.platforms, [p]: !f.platforms[p] } }));
  const submit = () => {
    const e = {};
    if (!form.fullName.trim()) e.fullName = 'الاسم الكامل مطلوب';
    if (!form.phone.trim()) e.phone = 'رقم الجوال مطلوب';
    else if (!/^09\d{8}$/.test(sanitizeDigits(form.phone))) e.phone = 'رقم جوال غير صحيح (مثال: 0912345678)';
    const hasIg = form.platforms.instagram && form.handles.ig.trim();
    const hasFb = form.platforms.facebook && form.handles.fb.trim();
    if (!hasIg && !hasFb) e.handles = 'فعّل منصة واحدة على الأقل وأدخل رابطها';
    // validate followers per enabled platform
    if (form.platforms.instagram) { if (!sanitizeDigits(form.followers.ig) || Number(sanitizeDigits(form.followers.ig)) <= 0) e.followersIg = 'عدد المتابعين لإنستغرام مطلوب'; }
    if (form.platforms.facebook) { if (!sanitizeDigits(form.followers.fb) || Number(sanitizeDigits(form.followers.fb)) <= 0) e.followersFb = 'عدد المتابعين لفيسبوك مطلوب'; }
    if (!form.platforms.instagram && !form.platforms.facebook) e.platform = 'اختر منصة واحدة على الأقل';
    setErr(e);
    if (Object.keys(e).length) return;
    // normalize followers to digits-only strings
    const nf = { ...form, followers: { ig: sanitizeDigits(form.followers.ig || ''), fb: sanitizeDigits(form.followers.fb || '') }, phone: sanitizeDigits(form.phone) };
    onSave(nf);
  };
  return (
    <div className="bg-white dark:bg-[#182422] rounded-2xl border border-slate-200 dark:border-slate-700 p-6 mt-4">
      <h3 className="font-bold">بيانات المؤثر</h3>
      <div className="grid sm:grid-cols-2 gap-4 mt-4">
        <div>
          <label className="text-xs font-bold">الاسم الكامل <span className="text-red-500">*</span></label>
          <input value={form.fullName} onChange={e => setForm({ ...form, fullName: e.target.value })} placeholder="مثال: سارة القحطاني" className={`mt-1 w-full rounded-xl border px-4 py-2.5 text-sm bg-white dark:bg-slate-800 ${err.fullName ? 'border-red-400' : 'border-slate-200 dark:border-slate-600'}`} />
          {err.fullName && <span className="text-[11px] text-red-600">{err.fullName}</span>}
        </div>
        <div>
          <label className="text-xs font-bold">رقم الجوال <span className="text-red-500">*</span></label>
          <input type="text" inputMode="numeric" pattern="[0-9]*" maxLength="10" value={form.phone} onKeyDown={onlyDigitsKey} onPaste={e => onDigitsPaste(e, v => setForm({ ...form, phone: v }))} onChange={e => setForm({ ...form, phone: sanitizeDigits(e.target.value) })} placeholder="09xxxxxxxx" className={`mt-1 w-full rounded-xl border px-4 py-2.5 text-sm bg-white dark:bg-slate-800 ${err.phone ? 'border-red-400' : 'border-slate-200 dark:border-slate-600'}`} />
          {err.phone && <span className="text-[11px] text-red-600">{err.phone}</span>}
        </div>
        <div className="sm:col-span-2">
          <label className="text-xs font-bold">المنصات <span className="text-red-500">*</span></label>
          <p className="text-[11px] text-slate-500 mt-1">فعّل إنستغرام أو فيسبوك أو كليهما — كل زر مستقل</p>
          <div className="grid grid-cols-2 gap-3 mt-2">
            {[
              { key: 'instagram', label: 'إنستغرام', icon: 'ri-instagram-line' },
              { key: 'facebook', label: 'فيسبوك', icon: 'ri-facebook-circle-line' },
            ].map(p => {
              const on = form.platforms[p.key];
              return (
                <div key={p.key} className="space-y-2">
                  <button onClick={() => togglePlatform(p.key)} className={`w-full py-2.5 rounded-xl border font-bold text-xs flex items-center justify-center gap-1.5 ${on ? 'bg-wasla text-white border-wasla' : 'bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-600 text-muted hover:bg-slate-50'}`}>
                    <i className={p.icon}></i> {p.label} {on && <i className="ri-check-line"></i>}
                  </button>
                  <input disabled={!on} value={p.key === 'instagram' ? form.handles.ig : form.handles.fb} onChange={e => setForm({ ...form, handles: { ...form.handles, [p.key === 'instagram' ? 'ig' : 'fb']: e.target.value } })} placeholder={p.key === 'instagram' ? '@username أو رابط إنستغرام' : 'رابط فيسبوك'} className={`w-full rounded-xl border px-4 py-2.5 text-sm ${!on ? 'bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-400 cursor-not-allowed opacity-60' : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-600'} ${err.handles ? 'border-red-400' : ''}`} />
                </div>
              );
            })}
          </div>
          {err.handles && <span className="text-[11px] text-red-600">{err.handles}</span>}
          {err.platform && <span className="text-[11px] text-red-600">{err.platform}</span>}
        </div>
        <div>
          <label className="text-xs font-bold">عدد المتابعين — إنستغرام {form.platforms.instagram && <span className="text-red-500">*</span>}</label>
          <input type="text" inputMode="numeric" pattern="[0-9]*" disabled={!form.platforms.instagram} value={form.followers.ig || ''} onKeyDown={onlyDigitsKey} onPaste={e => onDigitsPaste(e, v => setForm({ ...form, followers: { ...form.followers, ig: v } }))} onChange={e => setForm({ ...form, followers: { ...form.followers, ig: sanitizeDigits(e.target.value) } })} placeholder="مثال: 85000" className={`mt-1 w-full rounded-xl border px-4 py-2.5 text-sm ${!form.platforms.instagram ? 'bg-slate-100 dark:bg-slate-800 opacity-60 cursor-not-allowed' : ''} bg-white dark:bg-slate-800 ${err.followersIg ? 'border-red-400' : 'border-slate-200 dark:border-slate-600'}`} />
          {err.followersIg && <span className="text-[11px] text-red-600">{err.followersIg}</span>}
        </div>
        <div>
          <label className="text-xs font-bold">عدد المتابعين — فيسبوك {form.platforms.facebook && <span className="text-red-500">*</span>}</label>
          <input type="text" inputMode="numeric" pattern="[0-9]*" disabled={!form.platforms.facebook} value={form.followers.fb || ''} onKeyDown={onlyDigitsKey} onPaste={e => onDigitsPaste(e, v => setForm({ ...form, followers: { ...form.followers, fb: v } }))} onChange={e => setForm({ ...form, followers: { ...form.followers, fb: sanitizeDigits(e.target.value) } })} placeholder="مثال: 42000" className={`mt-1 w-full rounded-xl border px-4 py-2.5 text-sm ${!form.platforms.facebook ? 'bg-slate-100 dark:bg-slate-800 opacity-60 cursor-not-allowed' : ''} bg-white dark:bg-slate-800 ${err.followersFb ? 'border-red-400' : 'border-slate-200 dark:border-slate-600'}`} />
          {err.followersFb && <span className="text-[11px] text-red-600">{err.followersFb}</span>}
        </div>
        <div className="sm:col-span-2">
          <label className="text-xs font-bold">الاهتمامات</label>
          <div className="flex flex-wrap gap-2 mt-2">
            {interestsOptions.map(tag => (
              <button key={tag} onClick={() => toggleInterest(tag)} className={`px-3 py-1.5 rounded-full text-xs font-bold border ${form.interests.includes(tag) ? 'bg-wasla text-white border-wasla' : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-600'}`}>{tag}</button>
            ))}
          </div>
        </div>
        <div className="sm:col-span-2">
          <label className="text-xs font-bold">الباقات (اختياري)</label>
          <PackageEditor packages={form.packages} onChange={(arr) => setForm({ ...form, packages: arr })} />
        </div>
        <div className="sm:col-span-2">
          <label className="text-xs font-bold">أفضل 3 أعمال سابقة (اختياري)</label>
          {[0, 1, 2].map(i => (
            <input key={i} value={form.works[i] || ''} onChange={e => { const w = [...form.works]; w[i] = e.target.value; setForm({ ...form, works: w }); }} placeholder={`رابط العمل ${i + 1} — مثال: instagram.com/p/xyz`} className="mt-2 w-full rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 px-4 py-2.5 text-sm" />
          ))}
        </div>
      </div>
      <button onClick={submit} className="w-full mt-6 py-3 rounded-xl bg-wasla text-white font-bold text-sm hover:bg-waslaHover">حفظ الملف</button>
      <p className="text-[11px] text-slate-500 text-center mt-2">الحقول المميزة بـ <span className="text-red-500">*</span> مطلوبة — الباقات وروابط الأعمال اختيارية</p>
    </div>
  );
}
function PackageEditor({ packages, onChange }) {
  const [draft, setDraft] = useState(null); // {reels,posts,stories,notes,price,name}
  const [err, setErr] = useState('');
  const sorted = useMemo(() => [...packages].sort((a, b) => Number(a.price) - Number(b.price)), [packages]);
  const openAdd = () => { setDraft({ reels: 0, posts: 0, stories: 0, notes: '', price: '', name: '' }); setErr(''); };
  const saveDraft = () => {
    if (!draft.name.trim()) { setErr('اسم الباقة مطلوب'); return; }
    if (!sanitizeDigits(draft.price) || Number(sanitizeDigits(draft.price)) <= 0) { setErr('السعر مطلوب ويجب أن يكون رقمًا أكبر من صفر'); return; }
    const pkg = { id: 'p' + Date.now(), name: draft.name.trim(), price: Number(sanitizeDigits(draft.price)), reels: draft.reels || 0, stories: draft.stories || 0, posts: draft.posts || 0, notes: draft.notes.trim(), includes: `${draft.reels} ريلز + ${draft.posts} بوستات + ${draft.stories} ستوريات` + (draft.notes ? ` — ${draft.notes}` : '') };
    onChange([...packages, pkg].sort((a, b) => a.price - b.price));
    setDraft(null); setErr('');
  };
  return (
    <div className="space-y-2 mt-2">
      {sorted.length > 0 && (
        <div className="space-y-2">
          {sorted.map((p, i) => {
            const origIdx = packages.indexOf(p);
            return (
              <div key={p.id || i} className="flex items-center gap-2 p-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50/50 dark:bg-slate-800/30">
                <div className="flex-1 min-w-0">
                  <div className="font-bold text-sm">{p.name} — <span className="text-emerald-600">{Number(p.price).toLocaleString('ar-EG')} ر.س</span></div>
                  <div className="text-xs text-slate-500">{p.reels} ريلز • {p.posts} بوستات • {p.stories} ستوريات {p.notes ? `• ${p.notes}` : ''} {p.includes && !p.reels && !p.posts && !p.stories ? `• ${p.includes}` : ''}</div>
                </div>
                <button onClick={() => onChange(packages.filter((_, j) => j !== origIdx))} className="w-8 h-8 rounded-full bg-red-50 text-red-500 grid place-items-center shrink-0">
                  <i className="ri-delete-bin-line"></i>
                  </button>
              </div>
            );
          })}
        </div>
      )}
      {!draft ? (
        <button onClick={openAdd} className="w-full py-2.5 rounded-xl border-2 border-dashed border-slate-200 dark:border-slate-600 text-sm font-bold text-wasla hover:bg-waslaSoft dark:hover:bg-wasla/10">+ إضافة باقة</button>
      ) : (
        <div className="rounded-2xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 p-4 space-y-3">
          <div className="font-bold text-sm">باقة جديدة</div>
          <input value={draft.name} onChange={e => setDraft({ ...draft, name: e.target.value })} placeholder="اسم الباقة (مثال: باقة الظهور)" className="w-full rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 px-3 py-2.5 text-sm" />
          <div className="grid grid-cols-3 gap-2">
            {[
              { k: 'reels', l: 'عدد ', m: 'الريلات' },
              { k: 'posts', l: 'عدد ', m: 'البوستات' },
              { k: 'stories', l: 'عدد ', m: 'الستوريات' },
            ].map(f => {
              const v = draft[f.k] || 0;
              return (
                <div key={f.k} className="rounded-xl border border-slate-200 dark:border-slate-600 p-2.5 text-center bg-slate-50/50 dark:bg-slate-800/30">
                  <div className="text-[11px] font-bold">
                    <span className={"block"}>{f.l}</span>
                    <span className={"block"}>{f.m}</span>
                  </div>
                  <div className="flex items-center justify-center gap-1.5 mt-2">
                    <button onClick={() => setDraft({ ...draft, [f.k]: Math.max(0, v - 1) })} disabled={v === 0} className={`w-7 h-7 rounded-full border grid place-items-center ${v === 0 ? 'bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-400 opacity-50 cursor-not-allowed' : 'bg-white dark:bg-slate-700 border-slate-200 dark:border-slate-600'}`}>−</button>
                    <span className="w-6 text-center font-bold text-sm">{v}</span>
                    <button onClick={() => setDraft({ ...draft, [f.k]: v + 1 })} className="w-7 h-7 rounded-full bg-wasla text-white grid place-items-center">+</button>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="grid grid-cols-2 gap-3">
            <input type="text" inputMode="numeric" pattern="[0-9]*" value={draft.price} onKeyDown={onlyDigitsKey} onPaste={e => onDigitsPaste(e, v => setDraft({ ...draft, price: v }))} onChange={e => setDraft({ ...draft, price: sanitizeDigits(e.target.value) })} placeholder="السعر (ر.س)" className="rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 px-3 py-2.5 text-sm" />
            <input value={draft.notes} onChange={e => setDraft({ ...draft, notes: e.target.value })} placeholder="ملاحظات اختيارية" className="rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 px-3 py-2.5 text-sm" />
          </div>
          {err && <div className="text-xs font-bold text-red-600">{err}</div>}
          <div className="flex gap-2">
            <button onClick={saveDraft} className="flex-1 py-2.5 rounded-xl bg-wasla text-white font-bold text-sm hover:bg-waslaHover">حفظ الباقة</button>
            <button onClick={() => { setDraft(null); setErr(''); }} className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-600 font-bold text-sm">إلغاء</button>
          </div>
        </div>
      )}
    </div>
  );
}


export default App;
