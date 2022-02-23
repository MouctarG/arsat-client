import { NgModule } from "@angular/core";
import { CopyClipboardDirective } from "./copyClipboard.directive";


@NgModule({
  declarations: [
    CopyClipboardDirective
  ],
  exports: [
    CopyClipboardDirective
  ]
})
export class ToolsModule { }
