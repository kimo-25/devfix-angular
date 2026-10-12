import { Directive, OnDestroy, OnInit, effect, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ThemeService } from './theme.service';

/**
 * Tiny state helper shared by the page components.
 * `state` + `setState()` mimic the design prototype; `renderVals()` builds the
 * view-model `v` that the templates bind to. Query params override the demo
 * "tweaks", e.g. /tracking?stage=ready&sla=grace  or  /center/wallet?delays=3
 */
@Directive()
export abstract class DcBase implements OnInit, OnDestroy {
  [key: string]: any;

  protected themeSvc = inject(ThemeService);
  protected route = inject(ActivatedRoute);

  defaults: Record<string, any> = {};
  state: any = {};
  v: any = {};

  constructor() {
    effect(() => {
      this.themeSvc.theme();
      this.refresh();
    });
  }

  get props(): Record<string, any> {
    const q = this.route.snapshot.queryParams;
    const out: Record<string, any> = { ...this.defaults, theme: this.themeSvc.theme() };
    for (const k of Object.keys(this.defaults)) {
      if (q[k] !== undefined) out[k] = typeof this.defaults[k] === 'number' ? Number(q[k]) : q[k];
    }
    return out;
  }

  ngOnInit(): void {
    this.refresh();
    this.componentDidMount();
  }

  ngOnDestroy(): void {
    this.componentWillUnmount();
  }

  componentDidMount(): void {}
  componentWillUnmount(): void {}
  abstract renderVals(): any;

  setState(patch: any): void {
    const p = typeof patch === 'function' ? patch(this.state) : patch;
    this.state = { ...this.state, ...p };
    this.refresh();
  }

  refresh(): void {
    this.v = this.renderVals();
  }
}
