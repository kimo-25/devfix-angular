import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DcBase } from '../../../core/dc-base';
import { DemoNavComponent } from '../../../shared/demo-nav/demo-nav.component';

@Component({
  selector: 'app-otp-dialogs',
  standalone: true,
  imports: [RouterLink, DemoNavComponent],
  templateUrl: './otp-dialogs.component.html',
  styleUrl: './otp-dialogs.component.css',
})
export class OtpDialogsComponent extends DcBase {
  override defaults: Record<string, any> = {"kind": "checkin"};
  constructor() { super(); this.state = { code: null, t: 0, input: '', bad: false, done: false }; }
  componentDidMount() { this.i = setInterval(() => this.setState((s) => ({ t: s.code ? s.t + 1 : 0 })), 1000); }
  componentWillUnmount() { clearInterval(this.i); }
  renderVals() {
    const st = this.state, ar = (n) => Number(n).toLocaleString('ar-EG');
    const inn = (this.props.kind ?? 'checkin') === 'checkin';
    const left = Math.max(0, 600 - st.t);
    return {
      themeClass: (this.props.theme ?? 'light') === 'dark' ? 'dark' : '',
      cTitle: inn ? 'كود إيداع الجهاز' : 'كود استلام الجهاز',
      cHelp: inn ? 'ولّد الكود عند وصولك للمحل. بعد تأكيده يبدأ العداد التنازلي.' : 'عاين جهازك أولاً ثم ولّد الكود لإغلاق الطلب وسداد المبلغ.',
      cBtn: inn ? 'ولّد كود الإيداع' : 'ولّد كود الاستلام',
      cNote: inn ? 'الإلغاء بعد تأكيد هذا الكود يخصم رسم فحص ٣٪.' : 'بعد التأكيد يُصدر النظام الفاتورة النهائية وتُفتح شاشة التقييم.',
      noCode: !st.code, hasCode: !!st.code, digits: st.code ? st.code.split('').map((d) => ar(d)) : [],
      left: ar(String(Math.floor(left / 60)).padStart(2, '0')) + ':' + ar(String(left % 60).padStart(2, '0')),
      gen: () => this.setState({ code: String(Math.floor(1000 + Math.random() * 9000)), t: 0 }),
      sTitle: inn ? 'تأكيد إيداع الجهاز' : 'تأكيد تسليم الجهاز',
      sBtn: inn ? 'تأكيد وبدء العداد' : 'تأكيد وإغلاق الطلب',
      result: inn ? 'الحالة: قيد التنفيذ + بدء العداد' : 'فاتورة نهائية + تحويل الصافي لمحفظتك',
      entry: !st.done, ok: st.done, bad: st.bad,
      setIn: (e) => this.setState({ input: e.target.value }),
      confirm: () => (/^\d{4}$/.test(st.input) ? this.setState({ done: true, bad: false }) : this.setState({ bad: true })),
      okTitle: inn ? 'تم استلام الجهاز' : 'تم إغلاق الطلب',
      okText: inn ? 'بدأ العداد التنازلي رسمياً. حدّث الحالة أولاً بأول.' : 'صافي مستحقاتك بعد عمولة المنصة أُضيف لمحفظتك.',
      reset: () => this.setState({ done: false, input: '', bad: false })
    };
  }
}
