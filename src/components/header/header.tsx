import { component$, useStylesScoped$ } from '@builder.io/qwik';
import styles from './header.css?inline';

export default component$(() => {
  useStylesScoped$(styles);

  return (
    <header>
      <div class="logo">
        <a href="/" title="qwik">
          <img src="https://miro.medium.com/fit/c/88/88/1*V7PIOoevMu5s2hfV1jcsJw.jpeg" alt="Anartz Mugika"/>
        </a> 
      </div>
      <ul>
        <li>
          <a href="https://anartz-mugika.com" target="_blank">
            Web personal
          </a>
        </li>
        <li>
          <a href="https://youtube.com/mugan86" target="_blank">
            Youtube
          </a>
        </li>
        <li>
          <a href="https://twitter.com/mugan86" target="_blank">
            Twitter
          </a>
        </li>
        <li>
          <a href="https://mugan86.medium.com/" target="_blank">
            Blog Tech Medium
          </a>
        </li>
      </ul>
    </header>
  );
});