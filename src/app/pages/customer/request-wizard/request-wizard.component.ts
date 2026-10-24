import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DcBase } from '../../../core/dc-base';

@Component({
  selector: 'app-request-wizard',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './request-wizard.component.html',
  styleUrl: './request-wizard.component.css',
})
export class RequestWizardComponent extends DcBase {
  isSubmitted = false;
  override defaults: Record<string, any> = {};
  constructor() {
    super();
    this.state = {
      step: 1,
      device: 1,
      issue: 'شاشة مكسورة',
      description: '',
      preference: 'multiple',
      center: 'مركز النخبة',
      location: 'سموحة',
      acceptedOffer: '',
      declinedOffers: []
    };
  }

  submitRequest(): void {
    this.isSubmitted = true;
    this.setState({ step: 4 });
  }

  renderVals() {
    const st = this.state;
    type DeviceType = 'mobile' | 'tablet' | 'laptop';
    type Device = { id: number; type: DeviceType; name: string; sub: string; def: boolean };
    const icons: Record<DeviceType, string> = { mobile: 'M8.5 2.5h7a2 2 0 0 1 2 2v15a2 2 0 0 1-2 2h-7a2 2 0 0 1-2-2v-15a2 2 0 0 1 2-2zM11 18.5h2', tablet: 'M6.5 3h11a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-11a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zM11 17.5h2', laptop: 'M5 6h14a1 1 0 0 1 1 1v9H4V7a1 1 0 0 1 1-1zM2 19h20' };
    const devs: Device[] = [
      { id: 1, type: 'mobile', name: 'iPhone 13', sub: 'موبايل · Apple', def: true },
      { id: 2, type: 'laptop', name: 'Dell XPS 13', sub: 'لابتوب · Dell', def: false },
      { id: 3, type: 'tablet', name: 'Galaxy Tab S8', sub: 'تابلت · Samsung', def: false }
    ];
    const cur = devs.find((d) => d.id === st.device);
    const currentDevice = cur ?? devs[0];
    const issueSets: Record<DeviceType, string[]> = { mobile: ['شاشة مكسورة', 'بطارية', 'لا يشحن', 'الكاميرا', 'ماء أو رطوبة', 'برمجيات'], laptop: ['لا يعمل', 'سخونة زائدة', 'الشاشة', 'لوحة المفاتيح', 'اللوحة الأم', 'برمجيات'], tablet: ['اللمس لا يستجيب', 'شاشة مكسورة', 'بطارية', 'منفذ الشحن', 'بطيء', 'برمجيات'] };
    const labels = ['الجهاز', 'وصف العطل والعروض', 'المراجعة'];
    const step = st.step;
    const offers = [
      { id: 'star-repair', name: 'مركز النجم للصيانة', rating: '4.8', reviews: '112', price: '350 ج.م', time: 'خلال 24 ساعة', location: 'سموحة' },
      { id: 'elite', name: 'مركز النخبة', rating: '4.9', reviews: '128', price: '450 ج.م', time: 'خلال 48 ساعة', location: 'سيدي جابر' },
      { id: 'smart-fix', name: 'سمارت فيكس', rating: '4.6', reviews: '74', price: '400 ج.م', time: 'خلال 36 ساعة', location: 'ميامي' }
    ];
    return {
      themeClass: (this.props['theme'] ?? 'light') === 'dark' ? 'dark' : '',
      stepper: labels.map((l: string, i: number) => ({ n: String(i + 1).replace(/\d/g, (d: string) => '٠١٢٣٤٥٦٧٨٩'[Number(d)]), label: l, cls: step > i + 1 ? 'done' : step === i + 1 ? 'on' : '', color: step >= i + 1 ? 'var(--ink)' : 'var(--muted)' })),
      s1: step === 1, s2: step === 2, s3: step === 3, showNav: step < 3,
      devices: devs.map((d) => ({ name: d.name, sub: d.sub, icon: icons[d.type], badge: d.def ? 'افتراضي' : '', cls: st.device === d.id ? 'on' : '', pressed: st.device === d.id ? 'true' : 'false', pick: () => this.setState({ device: d.id, issue: issueSets[d.type][0] }) })),
      issues: issueSets[currentDevice?.type].map((l: string) => ({ label: l, cls: st.issue === l ? 'on' : '', pressed: st.issue === l ? 'true' : 'false', pick: () => this.setState({ issue: l }) })),
      description: st.description,
      setDescription: (e: Event) => this.setState({ description: (e.target as HTMLTextAreaElement).value }),
      preferences: [
        { value: 'multiple', label: 'استقبال عدة عروض', description: 'قارن بين أفضل المراكز والأسعار', cls: st.preference === 'multiple' ? 'on' : '', pressed: st.preference === 'multiple' ? 'true' : 'false', pick: () => this.setState({ preference: 'multiple' }) },
        { value: 'specific', label: 'اختيار مركز صيانة محدد', description: 'أرسل الطلب إلى مركز أعرفه', cls: st.preference === 'specific' ? 'on' : '', pressed: st.preference === 'specific' ? 'true' : 'false', pick: () => this.setState({ preference: 'specific' }) }
      ],
      centers: ['مركز النخبة', 'تك زون', 'سمارت فيكس'].map((center) => ({ label: center, cls: st.center === center ? 'on' : '', pressed: st.center === center ? 'true' : 'false', pick: () => this.setState({ center }) })),
      location: st.location,
      setLocation: (e: Event) => this.setState({ location: (e.target as HTMLInputElement).value }),
      sumDevice: currentDevice?.name,
      sumIssue: step >= 2 ? st.issue : '—',
      sumDescription: st.description || '—',
      sumPreference: st.preference === 'multiple' ? 'استقبال عدة عروض' : 'اختيار مركز صيانة محدد',
      sumCenter: st.preference === 'specific' ? st.center : '—',
      sumLocation: st.location || '—',
      noPrev: step === 1, prev: () => this.setState({ step: Math.max(1, step - 1) }),
      next: () => this.setState({ step: step + 1 }),
      nextLabel: 'التالي ←',
      acceptedOffer: st.acceptedOffer,
      offerStatus: st.acceptedOffer ? 'تم اختيار العرض' : '',
      offers: offers.filter((offer) => !st.declinedOffers.includes(offer.id)).map((offer) => ({
        ...offer,
        accept: () => this.setState({ acceptedOffer: offer.id }),
        decline: () => this.setState((state: any) => ({ declinedOffers: state.declinedOffers.concat(offer.id) }))
      }))
    };
  }
}
