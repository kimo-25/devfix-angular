import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, NgFor],
  template: `
  <div class="app-shell" [class.dark-mode]="darkMode">
    <aside class="sidebar" [class.open]="menuOpen">
      <a routerLink="/" class="brand" (click)="menuOpen=false">
        <span class="brand-mark">D</span><span><b>DevFix</b><small>DEVICE CARE PLATFORM</small></span>
      </a>
      <div class="side-label">القائمة الرئيسية</div>
      <nav>
        <a *ngFor="let item of customerNav" [routerLink]="item.url" routerLinkActive="active" [routerLinkActiveOptions]="{exact:item.url==='/'}" (click)="menuOpen=false">
          <span class="nav-icon">{{item.icon}}</span><span>{{item.label}}</span>
        </a>
      </nav>
      <div class="side-label">مركز الصيانة</div>
      <nav>
        <a *ngFor="let item of centerNav" [routerLink]="item.url" routerLinkActive="active" (click)="menuOpen=false">
          <span class="nav-icon">{{item.icon}}</span><span>{{item.label}}</span>
        </a>
      </nav>
      <div class="side-label">إدارة المنصة</div>
      <nav>
        <a *ngFor="let item of adminNav" [routerLink]="item.url" routerLinkActive="active" (click)="menuOpen=false">
          <span class="nav-icon">{{item.icon}}</span><span>{{item.label}}</span>
        </a>
      </nav>
      <div class="sidebar-bottom">
        <div class="help-box"><span class="help-icon">✦</span><b>محتاج مساعدة؟</b><p>فريق الدعم جاهز يساعدك.</p><a class="help-primary" routerLink="/help">مركز المساعدة <span aria-hidden="true">←</span></a><div class="help-links"><a routerLink="/glossary">دليل المصطلحات</a><a routerLink="/about">عن المشروع</a><a routerLink="/market-analysis">دراسة السوق</a></div></div>
        <div class="profile-mini"><div class="avatar">ع</div><div><b>عمر السيد</b><small>حساب تجريبي</small></div><span class="dots">•••</span></div>
      </div>
    </aside>
    <main class="main-area">
      <header class="topbar">
        <button class="menu-btn" (click)="menuOpen=!menuOpen" aria-label="فتح القائمة">☰</button>
        <div class="crumb"><span class="crumb-home">DevFix</span><span class="crumb-sep">/</span><b>منصة صيانة الأجهزة</b></div>
        <div class="top-actions">
          <label class="top-search"><span>⌕</span><input aria-label="بحث سريع" placeholder="ابحث في المنصة..." /></label>
          <button class="icon-btn theme-toggle" (click)="toggleTheme()" [attr.aria-label]="darkMode ? 'تفعيل الوضع الفاتح' : 'تفعيل الوضع الداكن'" [title]="darkMode ? 'الوضع الفاتح' : 'الوضع الداكن'">{{darkMode ? '☀' : '☾'}}</button>
          <button class="icon-btn notification-btn" title="الإشعارات">♧<i></i></button>
          <button class="top-avatar" title="الملف الشخصي">ع</button>
        </div>
      </header>
      <router-outlet></router-outlet>
      <footer>© 2026 DevFix · منصة صيانة الأجهزة <span>واجهة تجريبية — البيانات المعروضة غير حقيقية</span></footer>
    </main>
  </div>
  `,
  styles: [`
    :host{display:block;min-height:100vh}.app-shell{min-height:100vh}.sidebar{position:fixed;inset:0 0 0 auto;width:260px;background:#fff;border-left:1px solid #e8edf4;z-index:20;display:flex;flex-direction:column;padding:24px 16px;overflow-y:auto}.brand{display:flex;align-items:center;gap:11px;text-decoration:none;color:#14213d;padding:0 8px 27px}.brand-mark{display:grid;place-items:center;width:43px;height:43px;border-radius:14px;background:#2463eb;color:white;font-size:25px;font-weight:800;box-shadow:0 7px 15px #2463eb30}.brand b{display:block;font-size:20px;letter-spacing:-.5px}.brand small{display:block;font-size:9px;letter-spacing:1.4px;color:#8a96aa;margin-top:2px}.side-label{font-size:11px;font-weight:800;color:#a0aabc;padding:13px 12px 8px}nav{display:grid;gap:4px;margin-bottom:8px}nav a{display:flex;align-items:center;gap:12px;text-decoration:none;color:#64718a;padding:11px 12px;border-radius:10px;font-size:13px;font-weight:600;transition:.2s}nav a:hover{background:#f4f7ff;color:#245de0}nav a.active{background:#eaf0ff;color:#2159db;font-weight:800}.nav-icon{width:22px;text-align:center;font-size:17px}.sidebar-bottom{margin-top:auto}.help-box{background:#f1f5ff;border:1px solid #e4ebff;border-radius:14px;padding:15px;margin:15px 2px}.help-icon{display:grid;place-items:center;width:30px;height:30px;border-radius:9px;background:white;color:#2864e8;margin-bottom:10px}.help-box b{font-size:12px}.help-box p{font-size:11px;color:#77839a;margin:6px 0 10px}.help-box a{font-size:11px;font-weight:800;color:#245de0;text-decoration:none}.help-primary{display:flex;align-items:center;justify-content:space-between;gap:8px;background:#e1eaff;border-radius:8px;padding:8px 10px}.help-primary span{font-size:14px}.help-links{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:5px 8px;margin-top:9px}.help-links a{min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;border-radius:6px;padding:5px 3px;font-size:9px;text-align:center}.help-links a:hover{background:#e1eaff}.profile-mini{display:flex;align-items:center;gap:10px;border-top:1px solid #edf0f5;padding:17px 4px 0}.avatar,.top-avatar{display:grid;place-items:center;background:#e9efff;color:#245de0;border:0;border-radius:50%;width:37px;height:37px;font-weight:800}.profile-mini b{display:block;font-size:12px}.profile-mini small{font-size:10px;color:#9aa4b5}.dots{margin-right:auto;color:#8994a6}.main-area{margin-right:260px;min-height:100vh;display:flex;flex-direction:column}.topbar{height:76px;background:#fff;border-bottom:1px solid #e8edf4;display:flex;align-items:center;padding:0 34px;gap:15px;position:sticky;top:0;z-index:10}.crumb{font-size:12px;color:#98a3b5;display:flex;align-items:center;gap:10px}.crumb b{color:#35415a}.crumb-sep{color:#d0d6e0}.top-actions{margin-right:auto;display:flex;align-items:center;gap:15px}.icon-btn{position:relative;border:1px solid #e7ebf2;background:#fff;width:38px;height:38px;border-radius:11px;color:#65728a;font-size:19px}.icon-btn i{position:absolute;width:6px;height:6px;border-radius:50%;background:#f05a65;top:8px;left:8px}.top-avatar{width:36px;height:36px}.menu-btn{display:none;border:0;background:#f3f6fc;border-radius:9px;padding:8px 11px}footer{margin-top:auto;padding:22px 34px;color:#9ba5b5;font-size:10px;display:flex;justify-content:space-between;gap:12px}.menu-btn{cursor:pointer}@media(max-width:900px){.sidebar{transform:translateX(105%);transition:transform .25s;box-shadow:none}.sidebar.open{transform:translateX(0);box-shadow:0 0 0 999px #11182766}.main-area{margin-right:0}.menu-btn{display:block}.topbar{padding:0 18px}footer{padding:18px}.crumb{font-size:11px}}
    .top-search{display:flex;align-items:center;gap:9px;border:1px solid #e4e9f2;background:#f8faff;border-radius:12px;padding:0 12px;height:39px;min-width:210px;color:#8a96aa}.top-search span{font-size:22px}.top-search input{width:100%;border:0;outline:0;background:transparent;color:#25314a;font-size:12px;min-width:0}.crumb-home{font-weight:800;color:#245de0}.top-actions{gap:10px}.theme-toggle{font-size:21px;cursor:pointer;background:#f7f9ff;color:#465574}.notification-btn{cursor:pointer}.top-avatar{cursor:pointer;box-shadow:0 0 0 4px #edf2ff}
    .app-shell.dark-mode{background:#0b1120;color:#e5eaf4;color-scheme:dark}.dark-mode .sidebar,.dark-mode .topbar{background:#111a2d;border-color:#26334a}.dark-mode .brand{color:#f1f5ff}.dark-mode .brand small,.dark-mode .side-label,.dark-mode .profile-mini small{color:#8492ad}.dark-mode nav a{color:#a9b6cd}.dark-mode nav a:hover{background:#1a2943;color:#91b7ff}.dark-mode nav a.active{background:#1b3158;color:#8db4ff}.dark-mode .help-box{background:#17243c;border-color:#283b60}.dark-mode .help-box b,.dark-mode .profile-mini b{color:#e9efff}.dark-mode .help-box p{color:#a0aec6}.dark-mode .help-icon{background:#223454;color:#9bbcff}.dark-mode .main-area{background:#0b1120}.dark-mode .top-search,.dark-mode .theme-toggle,.dark-mode .icon-btn{background:#172238;border-color:#2b3952;color:#d3def2}.dark-mode .top-search input{color:#e5eaf4}.dark-mode .crumb b{color:#dce6f7}.dark-mode .top-avatar{background:#223454;color:#a9c5ff;box-shadow:0 0 0 4px #172238}.dark-mode footer{color:#7f8da7}.dark-mode .menu-btn{background:#172238;color:#e5eaf4}
    @media(max-width:650px){.top-search{display:none}.topbar{gap:10px}.crumb{gap:6px}.brand{padding-bottom:20px}}

    /* Premium shell refinements */
    .app-shell{background:#f5f7fc;color:#17233c;background-image:radial-gradient(ellipse at 50% -20%,rgba(50,103,229,.07),transparent 45%)}
    .sidebar{width:272px;padding:26px 17px 18px;background:rgba(255,255,255,.96);border-left-color:#e5ebf5;box-shadow:8px 0 35px rgba(25,45,85,.025);backdrop-filter:blur(18px)}
    .brand{padding:0 9px 29px;gap:12px}
    .brand-mark{width:46px;height:46px;border-radius:15px;background:linear-gradient(145deg,#4b83ff,#2156d6);box-shadow:0 9px 20px rgba(37,99,235,.24)}
    .brand b{font-size:22px;letter-spacing:-.7px}
    .brand small{font-size:9px;letter-spacing:1.25px}
    .side-label{padding:15px 12px 9px;font-size:10px;letter-spacing:.7px}
    nav{gap:5px;margin-bottom:8px}
    nav a{min-height:43px;border-radius:12px;padding:11px 13px;font-size:12px;gap:13px;position:relative;transition:background .2s,color .2s,transform .2s}
    nav a:hover{transform:translateX(-2px);background:#f2f6ff}
    nav a.active{background:linear-gradient(100deg,#eaf1ff,#f3f6ff);color:#245bda;box-shadow:inset -3px 0 0 #3674f6}
    .nav-icon{width:23px;height:23px;display:grid;place-items:center;font-size:17px;border-radius:8px}
    nav a.active .nav-icon{background:#dce8ff}
    .help-box{border-radius:17px;padding:16px;margin:18px 2px;background:linear-gradient(145deg,#f2f6ff,#eaf1ff);border-color:#e2eaff}
    .help-icon{width:34px;height:34px;border-radius:11px;color:#fff;background:linear-gradient(145deg,#4d84fb,#2861e5)}
    .profile-mini{border-top-color:#e8edf5;padding:17px 4px 0}
    .avatar,.top-avatar{background:#e8efff;color:#2a60d9}
    .main-area{margin-right:272px;background:#f7f9fd}
    .topbar{height:78px;padding:0 clamp(20px,3vw,42px);background:rgba(255,255,255,.92);border-bottom-color:#e8edf5;backdrop-filter:blur(18px);gap:18px}
    .crumb{font-size:12px;gap:11px}
    .crumb-home{color:#245de0}
    .top-actions{gap:11px}
    .top-search{height:42px;min-width:235px;border-radius:13px;background:#f7f9fd;border-color:#e6ebf4}
    .top-search input{font-size:12px}
    .icon-btn{width:41px;height:41px;border-radius:13px;border-color:#e6ebf4;transition:transform .18s,background .18s}
    .icon-btn:hover{transform:translateY(-2px);background:#f1f5ff}
    .top-avatar{width:39px;height:39px;box-shadow:0 0 0 4px #f0f4ff;font-size:14px}
    footer{padding:24px clamp(20px,3vw,42px);font-size:10px;color:#929eb1}
    .dark-mode{background:#0b1120;background-image:none}
    .dark-mode .help-primary{background:#223454;color:#dbe7ff}
    .dark-mode .help-links a:hover{background:#223454}
    .dark-mode .sidebar{box-shadow:8px 0 35px rgba(0,0,0,.12)}
    .dark-mode nav a.active{background:linear-gradient(100deg,#1b3158,#172944);box-shadow:inset -3px 0 0 #5b8df7}
    .dark-mode .topbar{backdrop-filter:blur(18px)}
    .dark-mode .top-search{background:#0d1628}
    .dark-mode .page-wrap{background-image:radial-gradient(ellipse at 90% 0%,rgba(37,99,235,.09),transparent 35%)}
    @media(max-width:900px){.sidebar{width:272px}.main-area{margin-right:0}.topbar{height:70px}}
    @media(max-width:650px){.topbar{padding:0 14px}.crumb b{display:none}.top-actions{gap:7px}.icon-btn{width:36px;height:36px}.top-avatar{width:34px;height:34px}footer{padding:18px 15px}}
  `]
})
export class AppComponent {
  menuOpen = false;
  darkMode = localStorage.getItem('theme') === 'dark';
  toggleTheme() {
    this.darkMode = !this.darkMode;
    localStorage.setItem('theme', this.darkMode ? 'dark' : 'light');
  }
  customerNav = [
    {icon:'⌂',label:'الرئيسية',url:'/'},{icon:'▦',label:'أجهزتي',url:'/devices'},
    {icon:'⌕',label:'البحث عن مركز',url:'/search'},{icon:'＋',label:'طلب صيانة جديد',url:'/wizard'},
    {icon:'⇄',label:'مقارنة العروض',url:'/compare'},{icon:'◷',label:'تتبع الطلب',url:'/request-detail'},
    {icon:'☆',label:'التقييمات',url:'/reviews'},{icon:'◇',label:'الضمان',url:'/warranty'},
    {icon:'◈',label:'المحفظة',url:'/wallet'},{icon:'♙',label:'حسابي',url:'/account'},
    {icon:'♧',label:'الإشعارات',url:'/notifications'},
    {icon:'⚙',label:'الإشعارات والخصوصية',url:'/preferences'},{icon:'◇',label:'سياسة الضمان',url:'/warranty-policy'},
    {icon:'☏',label:'مركز المساعدة',url:'/help'}
  ];
  centerNav = [
    {icon:'▦',label:'لوحة المركز',url:'/center/dashboard'},
    {icon:'＋',label:'تسجيل مركز',url:'/center/register'},{icon:'▤',label:'طلبات متاحة',url:'/center/feed'},
    {icon:'▣',label:'الطلبات الجارية',url:'/center/jobs'},{icon:'⚙',label:'الخدمات والأسعار',url:'/center/services'},
    {icon:'☆',label:'تقييمات العملاء',url:'/center/reviews'},{icon:'◈',label:'محفظة المركز',url:'/center/wallet'}
  ];
  adminNav = [
    {icon:'▦',label:'لوحة الإدارة',url:'/admin/dashboard'},
    {icon:'✓',label:'مراجعة المراكز',url:'/admin/verify'},{icon:'⚑',label:'العمليات والنزاعات',url:'/admin/ops'},
    {icon:'▤',label:'التقارير والإحصائيات',url:'/admin/reports'},{icon:'＄',label:'الإدارة المالية',url:'/admin/finance'},
    {icon:'☏',label:'دعم العملاء',url:'/admin/support'},{icon:'♢',label:'الأمان والمراقبة',url:'/admin/security'},
    {icon:'♙',label:'الأدوار والصلاحيات',url:'/admin/roles'}
  ];
}