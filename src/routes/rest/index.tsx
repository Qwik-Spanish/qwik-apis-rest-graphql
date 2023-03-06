import { component$, Resource, useResource$, useStore } from '@builder.io/qwik';
import { ergastF1ChampionshipRaceListAPI } from '~/api/ergast-f1';

export default component$(() => {
  // 1
  const races = useStore({
    year: '1950',
  });
  // 3
  const selectYearRacesResource = useResource$<any>(({ track, cleanup }) => {
    // 7.- Observar cambios en el año con track para ejecutar la búsqueda con el nuevo valor
    track(() => races.year);
    // Es buena práctica usar `AbortController` para abortar (cancelar) la obtención de datos si
    // llega una nueva solicitud. Creamos un nuevo `AbortController` y registramos una `limpieza` (cleanup)
    // función que se llama cuando se vuelve a ejecutar esta función.
    const controller = new AbortController();
    cleanup(() => controller.abort());

    return ergastF1ChampionshipRaceListAPI(races.year, controller);
  });
  // 4.- Pintar la información
  // 6.- Añadir input para cambiar años
  return (
    <>
      <h1>Formula 1 - Tabla de resultados {races.year}</h1>
      <span>
        Select Year:
        <input
          type='number'
          min='1950'
          max='2022'
          value={races.year}
          onInput$={(ev) =>
            (races.year = (ev.target as HTMLInputElement).value)
          }
        />
      </span>
      <Resource
        value={selectYearRacesResource}
        onPending={() => <>Loading...</>}
        onRejected={(error) => <>Error: {error.message}</>}
        onResolved={(races: any) => {
            return (races.length) ? (
                <ul>
                  {races.map((race: any) => (
                    <li>
                      <a href={race.url} target='_blank'>
                        {race.raceName}
                      </a>{' '}
                      ({race.date})
                    </li>
                  ))}
                </ul>
              ): <p>Sin carreras en el año seleccionado. Recuerda que solo podemos obtener información de carreras de 1950-2023 (incluidos)</p>}
          
        }
      />
    </>
  );
});
