import { Input,Component } from '@angular/core';
import data from '../../assets/json/data.json';
@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.css']
})
export class ChildComponent {
  @Input() item = '';
  public toDisplay(): string{
    return data[this.item as keyof typeof data]
  }
}
