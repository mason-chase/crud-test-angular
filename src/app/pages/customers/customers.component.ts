import {Component, OnInit} from '@angular/core';
import {
  GroupingState,
  IDeleteAction,
  IFilterView,
  IGroupingView,
  ISearchView,
  ISortView,
  PaginatorState,
  SortState
} from "../../core/shared/crud-table";
import {FormBuilder, FormGroup} from "@angular/forms";
import {debounceTime, distinctUntilChanged} from "rxjs";
import {CustomerService} from "../../services/customers/customer.service";
import {AuthService} from "../../modules/auth/auth.service";

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent
  implements OnInit,
    IDeleteAction,
    ISortView,
    IFilterView,
    IGroupingView,
    ISearchView,
    IFilterView {
  // @ts-ignore
  paginator: PaginatorState;
  // @ts-ignore
  sorting: SortState;
  // @ts-ignore
  grouping: GroupingState;
  // @ts-ignore
  isLoading: boolean;
  // @ts-ignore
  filterGroup: FormGroup;
  // @ts-ignore
  searchGroup: FormGroup;

  constructor(
    private fb: FormBuilder,
    public customerService: CustomerService,
    public authService: AuthService
  ) {
  }

  // angular lifecircle hooks
  ngOnInit(): void {
    this.filterForm();
    this.searchForm();
    this.customerService.isLoading$.subscribe(res => this.isLoading = res);
    this.grouping = this.customerService.grouping;
    this.paginator = this.customerService.paginator;
    this.sorting = this.customerService.sorting;
    this.customerService.fetch();
  }

  // filtration
  filterForm() {
    this.filterGroup = this.fb.group({
      status: [''],
      condition: [''],
      searchTerm: [''],
    });
    this.filterGroup.controls['status'].valueChanges.subscribe(() =>
      this.filter()
    );
    this.filterGroup.controls['condition'].valueChanges.subscribe(() => this.filter())

  }

  filter() {
    const filter = {};
    // @ts-ignore
    const status = this.filterGroup.get('status').value;
    if (status) {
      // @ts-ignore
      filter['status'] = status;
    }

    // @ts-ignore
    const condition = this.filterGroup.get('condition').value;
    if (condition) {
      // @ts-ignore
      filter['condition'] = condition;
    }
    this.customerService.patchState({filter});
  }

  // search
  searchForm() {
    this.searchGroup = this.fb.group({
      searchTerm: [''],
    });
    this.searchGroup.controls['searchTerm'].valueChanges
      .pipe(
        /*
  The user can type quite quickly in the input box, and that could trigger a lot of server requests. With this operator,
  I am limiting the amount of server requests emitted to a maximum of one every 180ms
  */
        debounceTime(180),
        distinctUntilChanged()
      )
      .subscribe((val) => this.search(val));
  }

  search(searchTerm: string) {
    this.customerService.patchState({searchTerm});
  }

  // sorting
  sort(column: string) {
    const sorting = this.sorting;
    const isActiveColumn = sorting.column === column;
    if (!isActiveColumn) {
      sorting.column = column;
      sorting.direction = 'asc';
    } else {
      sorting.direction = sorting.direction === 'asc' ? 'desc' : 'asc';
    }
    this.customerService.patchState({sorting});
  }

  // pagination
  paginate(paginator: PaginatorState) {
    this.customerService.patchState({paginator});
  }

  // actions
  delete(id: number) {
    // delete it
    this.customerService.delete(id).subscribe().add(() => this.customerService.fetch())
  }

}
