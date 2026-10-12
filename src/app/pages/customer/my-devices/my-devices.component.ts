import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DcBase } from '../../../core/dc-base';
import { DemoNavComponent } from '../../../shared/demo-nav/demo-nav.component';

@Component({
  selector: 'app-my-devices',
  standalone: true,
  imports: [RouterLink, DemoNavComponent],
  templateUrl: './my-devices.component.html',
  styleUrl: './my-devices.component.css',
})
export class MyDevicesComponent extends DcBase {
  override defaults: Record<string, any> = {};
  constructor() { super();
    this.state = { open: false, type: 'mobile', brand: '', model: '', imei: '', nextId: 4, list: [
      { id: 1, type: 'mobile', name: 'iPhone 13', brand: 'Apple', imei: '••••4821', def: true },
      { id: 2, type: 'laptop', name: 'Dell XPS 13', brand: 'Dell', imei: '', def: false },
      { id: 3, type: 'tablet', name: 'Galaxy Tab S8', brand: 'Samsung', imei: '', def: false }
    ] };
  }
  renderVals() {
    const st = this.state;
    const icons = { mobile: 'M8.5 2.5h7a2 2 0 0 1 2 2v15a2 2 0 0 1-2 2h-7a2 2 0 0 1-2-2v-15a2 2 0 0 1 2-2zM11 18.5h2', tablet: 'M6.5 3h11a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-11a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zM11 17.5h2', laptop: 'M5 6h14a1 1 0 0 1 1 1v9H4V7a1 1 0 0 1 1-1zM2 19h20', pc: 'M4 4h16a1 1 0 0 1 1 1v10H3V5a1 1 0 0 1 1-1zM9 21h6M12 15v6' };
    const labels = { mobile: 'موبايل', tablet: 'تابلت', laptop: 'لابتوب', pc: 'PC' };
    return {
      themeClass: (this.props.theme ?? 'light') === 'dark' ? 'dark' : '',
      devices: st.list.map((d) => ({
        name: d.name, icon: icons[d.type], typeLabel: labels[d.type], sub: d.brand + (d.imei ? ' · IMEI ' + d.imei : ''),
        isDefault: d.def, border: d.def ? 'var(--accent)' : 'var(--line)', pressed: d.def ? 'true' : 'false',
        defaultBtn: d.def ? 'افتراضي' : 'اجعله افتراضياً',
        makeDefault: () => this.setState((s) => ({ list: s.list.map((x) => ({ ...x, def: x.id === d.id })) }))
      })),
      open: st.open, openAdd: () => this.setState({ open: true }), closeAdd: () => this.setState({ open: false }),
      types: Object.keys(labels).map((k) => ({ label: labels[k], cls: st.type === k ? 'on' : '', pressed: st.type === k ? 'true' : 'false', pick: () => this.setState({ type: k }) })),
      setBrand: (e) => this.setState({ brand: e.target.value }), setModel: (e) => this.setState({ model: e.target.value }), setImei: (e) => this.setState({ imei: e.target.value }),
      firstNote: st.list.length === 0 ? 'سيُحدَّد هذا الجهاز تلقائياً كجهاز افتراضي لأنه الأول.' : 'يمكنك تغيير الجهاز الافتراضي في أي وقت من قائمة أجهزتك.',
      addDevice: () => this.setState((s) => ({
        open: false, nextId: s.nextId + 1,
        list: s.list.concat([{ id: s.nextId, type: s.type, name: s.model || 'جهاز جديد', brand: s.brand || '—', imei: s.imei, def: s.list.length === 0 }])
      }))
    };
  }
}
