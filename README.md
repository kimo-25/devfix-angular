# DevFix — Angular 18 (standalone components)

منصة صيانة الأجهزة: واجهة عربية RTL بالكامل، محوّلة من لوحة التصميم إلى مشروع Angular.

## التشغيل
```bash
npm install
npm start          # http://localhost:4200
npm run build      # إنتاج → dist/devfix-web
```
يتطلب Node 18.19+ (تم البناء على Node 22).

## الهيكل
```
src/
  index.html                 # lang="ar" dir="rtl" + خط Cairo
  styles.css, styles/tokens.css   # لوحة الألوان المرجعية (فاتح/داكن)
  app/
    app.routes.ts            # كل المسارات (lazy loadComponent)
    core/
      dc-base.ts             # state + setState + query-param "tweaks"
      theme.service.ts       # فاتح/داكن (data-theme + localStorage)
    shared/demo-nav/         # قائمة التصفح العائمة + زر المظهر
    pages/
      public/    landing, auth (دخول/تسجيل + OTP), center-register
      customer/  my-devices, request-wizard, bids-comparison, order-tracking,
                 scope-change-dialog, otp-dialogs, customer-wallet, account
      center/    center-feed, center-jobs, center-wallet
      admin/     admin-verify, admin-ops, admin-finance
```

## المسارات
| المسار | الشاشة |
|---|---|
| `/` | الصفحة الرئيسية |
| `/auth` | تسجيل الدخول والتسجيل + OTP |
| `/center/register` | تسجيل محل صيانة |
| `/devices` · `/wizard` | أجهزتي (UC-01) · معالج الطلب (UC-02) |
| `/bids` | مقارنة العروض وقبول عرض (UC-04) |
| `/tracking` | تتبع الطلب والعداد وOTP (UC-05) |
| `/scope-change` · `/otp-dialogs` | تعديل النطاق (UC-06) · نوافذ OTP |
| `/wallet` · `/account` | المحفظة والتوكنز (UC-11) · حسابي |
| `/center/feed` · `/center/jobs` · `/center/wallet` | سوق الطلبات · الطلبات الجارية · المحفظة والأداء |
| `/admin/verify` · `/admin/ops` · `/admin/finance` | تسجيل المحلات · النزاعات · المالية |

## متغيرات المحاكاة (query params)
- `/tracking?stage=deposit|diagnosing|repairing|ready|done&sla=running|grace|late|frozen`
- `/center/wallet?delays=0..3` (٣ = حظر مؤقت)
- `/bids?balance=300&tokenBalance=5` (اختبار رصيد غير كافٍ / بدون توكنز)
- `/otp-dialogs?kind=checkin|checkout`

## الأسلوب (Styling)
- لا يوجد Tailwind: التصميم الأصلي مكتوب بـ CSS عادي مع متغيرات (CSS variables). تم نقله كما هو
  إلى `*.component.css` لكل شاشة (Angular يعزل النطاق تلقائياً) لتبقى النتيجة البصرية مطابقة.
- كل شاشة تحمل لوحة الألوان على `.dx` (فاتح) و`.dx.dark` (داكن). `styles/tokens.css` نسخة مرجعية.
- الخط Cairo من Google Fonts (يعمل بالاتصال بالإنترنت).

## ما هو تجريبي (يحتاج ربطاً بالخادم)
- كل البيانات (العروض، المحافظ، المحلات…) ثابتة داخل `renderVals()` في كل مكوّن؛ استبدلها بخدمات `HttpClient`.
- كود OTP يُولَّد عشوائياً في المتصفح، والتحقق يقبل أي أرقام بالطول المطلوب. التحقق الفعلي من الخادم.
- رفع الملفات والصور شكلي (يغيّر الحالة فقط).
- الحالة محلية لكل شاشة (`state`/`setState`)، ولا تنتقل بين الشاشات. للإنتاج استخدم
  Signals Store أو NgRx.
- ترويسة العميل/المحل/المنصة مكرّرة داخل قوالب الشاشات ولم تُستخرج لمكوّنات مشتركة بعد.

## ملاحظة البناء
`angular.json` يعطّل inlining الخطوط في بناء الإنتاج (`optimization.fonts=false`) كي لا يفشل البناء دون إنترنت؛ الخط يُحمَّل من `index.html`.
