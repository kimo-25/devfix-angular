import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DcBase } from '../../../core/dc-base';
import { DemoNavComponent } from '../../../shared/demo-nav/demo-nav.component';

@Component({
  selector: 'app-scope-change-dialog',
  standalone: true,
  imports: [RouterLink, DemoNavComponent],
  templateUrl: './scope-change-dialog.component.html',
  styleUrl: './scope-change-dialog.component.css',
})
export class ScopeChangeDialogComponent extends DcBase {
  override defaults: Record<string, any> = {};
  constructor() { super(); this.state = { view: 'request' }; }
  renderVals() {
    const v = this.state.view;
    const msgs = {
      approved: ['تمت الموافقة', 'حُجز ١٨٠ جنيه إضافية ومُدّدت المدة ٦ ساعات. استأنف العداد التنازلي.'],
      kept: ['سيكمل المحل الصيانة الأصلية', 'استمر العداد بالمدة والتكلفة الأصلية دون أي إضافات.'],
      cancelled: ['تم إلغاء الطلب', 'خُصم ٢٥٫٥ جنيه رسم فحص ورُدّ الباقي لمحفظتك. استلم جهازك من المحل بكود OTP.']
    };
    const m = msgs[v] || ['', ''];
    return {
      themeClass: (this.props.theme ?? 'light') === 'dark' ? 'dark' : '',
      isRequest: v === 'request', isReject: v === 'reject', isDone: v === 'approved' || v === 'kept' || v === 'cancelled',
      doneTitle: m[0], doneText: m[1],
      approve: () => this.setState({ view: 'approved' }), reject: () => this.setState({ view: 'reject' }),
      keepOriginal: () => this.setState({ view: 'kept' }), cancelAll: () => this.setState({ view: 'cancelled' }),
      back: () => this.setState({ view: 'request' })
    };
  }
}
