import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SettlementPage } from './settlement.page';

describe('SettlementPage', () => {
  let component: SettlementPage;
  let fixture: ComponentFixture<SettlementPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SettlementPage],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SettlementPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
