import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  template: `
    <div class="footer">
      <p>2023 © Created by: </p>
      <a href="https://www.ligiamonteiro.com/" target="_blank"> Lígia Monteiro</a>
      <span class="material-symbols-outlined">
          email
      </span>
      <a href='mailto:ligiatmonteiro@gmail.com'> ligiatmonteiro@gmail.com</a>
    </div>
  `,
  styles: [`
    .footer {
      display: flex;
      flex-direction: row;
      justify-content: center;
      gap: 0.3rem;
      margin: 1rem var( --lateralmargin);
      align-items: center
    }
    a,
    p {
      color: var(--gray);
      font-size: 0.7rem;
    }
    a:hover,
    a:active {
      transform: scale(1.1);
    }
    .material-symbols-outlined {
      color: var(--gray);
    }
    @media screen and (max-width: 450px){
      .footer {
        flex-direction: column;
      }

    }
  `]
})
export class FooterComponent implements OnInit{

  constructor() {

  }

  ngOnInit(): void {
    
  }
}
