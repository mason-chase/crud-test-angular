import {NgModule} from "@angular/core";
import {LocalDatePipe} from "./local-date.pipe";

@NgModule({
  declarations: [
    LocalDatePipe,
  ],
  exports: [
    LocalDatePipe
  ],
})

export class PipesModule {

}
