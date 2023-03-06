import { component$, Resource, useResource$ } from '@builder.io/qwik';
import { ergastF1ChampionshipRaceListAPI } from '~/api/ergast-f1';



export default component$(() => {
    // 1
    const selectYear = '2023';
    // 3
    const selectYearRacesResource = useResource$<any>(({ cleanup }) => {
        
    
        // Es buena práctica usar `AbortController` para abortar (cancelar) la obtención de datos si
         // llega una nueva solicitud. Creamos un nuevo `AbortController` y registramos una `limpieza` (cleanup)
         // función que se llama cuando se vuelve a ejecutar esta función.
        const controller = new AbortController();
        cleanup(() => controller.abort());
    
        // 2.-  Obtenemos la información de las carreras del año seleccionado
        return ergastF1ChampionshipRaceListAPI(selectYear, controller);
      });
    // 4.- Pintar la información
    return <>
        <h1>Formula 1 - Tabla de resultados { selectYear }</h1>
        <Resource
          value={selectYearRacesResource}
          onPending={() => <>Loading...</>}
          onRejected={(error) => <>Error: {error.message}</>}
          onResolved={(races:any) => {
            return (
              <ul>
                {races.map((race: any) => (
                  <li>
                    <a href={race.url} target='_blank'>
                      {race.raceName}
                    </a> ({ race.date})
                  </li>
                ))}
              </ul>
            );
          }}
        />
    </>

});