import { component$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import { Link } from '@builder.io/qwik-city';

export default component$(() => {
  return (
    <div>
      <h1>
        <span class='lightning'>⚡️</span> Artículo para consumir APIs tanto
        REST como GraphQL <span class='lightning'>⚡️</span>{' '}
      </h1>

      <h3>REST</h3>
      <ul>
        <li>
          <Link href='/rest/'>Carreras Temporada seleccionada Formula 1.</Link>
        </li>
      </ul>

      <h3>GraphQL</h3>

      <ul>
        <li>
          <Link href='/graphql/'>Países por continente seleccionado.</Link>
        </li>
      </ul>
    </div>
  );
});

export const head: DocumentHead = {
  title: 'Welcome to Qwik',
  meta: [
    {
      name: 'description',
      content: 'Qwik site description',
    },
  ],
};
