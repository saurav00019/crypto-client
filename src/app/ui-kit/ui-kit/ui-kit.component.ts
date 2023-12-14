import { Component } from '@angular/core';

@Component({
  selector: 'app-ui-kit',
  templateUrl: './ui-kit.component.html',
  styleUrls: ['./ui-kit.component.scss']
})
export class UiKitComponent {

  data: any = [{
    "parentName": "Parent One",
    "childProperties":
      [
        { "propertyName": "Property One" },
        { "propertyName": "Property Two" }
      ]
  }, {
    "parentName": "Parent Two",
    "childProperties":
      [
        { "propertyName": "Property Three" },
        { "propertyName": "Property Four" },
        { "propertyName": "Property Five" },
      ]
  }, {
    "parentName": "Parent Three",
    "childProperties":
      [
        { "propertyName": "Property Six" },
        { "propertyName": "Property Seven" },
        { "propertyName": "Property Eight" },
      ]
  }];

  toggleAccordian(event: { target: any; }, index: string | number) {
    const element = event.target;
    element.classList.toggle("a-active");
    if (this.data[index].isActive) {
      this.data[index].isActive = false;
    } else {
      this.data[index].isActive = true;
    }
    const panel = element.nextElementSibling;
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    }
  }

}
