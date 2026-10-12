import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DcBase } from '../../../core/dc-base';
import { DemoNavComponent } from '../../../shared/demo-nav/demo-nav.component';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [RouterLink, DemoNavComponent],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css',
})
export class LandingComponent extends DcBase {
  override defaults: Record<string, any> = {};
  constructor() { super(); this.state = { device: 'mobile' }; }
  renderVals() {
    const data = {
      mobile: { label: 'موبايل', issues: ['شاشة مكسورة', 'بطارية ضعيفة', 'لا يشحن', 'الكاميرا'], bids: [{ name: 'مركز النخبة', meta: '٤.٨ ★ · ٢٤ ساعة', price: '850' }, { name: 'فيكس برو', meta: '٤.٦ ★ · ٣٦ ساعة', price: '780' }, { name: 'تك كير', meta: '٤.٩ ★ · ٤٨ ساعة', price: '720' }] },
      tablet: { label: 'تابلت', issues: ['اللمس لا يستجيب', 'شاشة مكسورة', 'بطيء', 'منفذ الشحن'], bids: [{ name: 'تك كير', meta: '٤.٩ ★ · ٣٠ ساعة', price: '640' }, { name: 'مركز النخبة', meta: '٤.٨ ★ · ٢٤ ساعة', price: '690' }, { name: 'فيكس برو', meta: '٤.٦ ★ · ٤٢ ساعة', price: '600' }] },
      laptop: { label: 'لابتوب', issues: ['لا يعمل', 'سخونة زائدة', 'الشاشة', 'لوحة المفاتيح'], bids: [{ name: 'فيكس برو', meta: '٤.٦ ★ · ٤٨ ساعة', price: '1,100' }, { name: 'مركز النخبة', meta: '٤.٨ ★ · ٧٢ ساعة', price: '1,250' }, { name: 'لاب كير', meta: '٤.٧ ★ · ٦٠ ساعة', price: '980' }] },
      pc: { label: 'PC', issues: ['لا يقلع', 'كارت الشاشة', 'مصدر الطاقة', 'تجميع'], bids: [{ name: 'لاب كير', meta: '٤.٧ ★ · ٢٤ ساعة', price: '500' }, { name: 'تك كير', meta: '٤.٩ ★ · ٣٦ ساعة', price: '560' }, { name: 'فيكس برو', meta: '٤.٦ ★ · ٤٨ ساعة', price: '450' }] }
    };
    const cur = this.state.device;
    return {
      themeClass: (this.props.theme ?? 'light') === 'dark' ? 'dark' : '',
      devices: Object.keys(data).map((k) => ({ label: data[k].label, cls: k === cur ? 'on' : '', pressed: k === cur ? 'true' : 'false', pick: () => this.setState({ device: k }) })),
      issues: data[cur].issues,
      sampleBids: data[cur].bids
    };
  }
}
