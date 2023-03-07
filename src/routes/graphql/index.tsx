import {
  component$,
  Resource,
  useResource$,
  useSignal,
} from '@builder.io/qwik';
import { countriesGraphQLAPI } from '~/api/countries-data';

export default component$(() => {
  const selectContinent = useSignal('');
  const continentsListResource = useResource$<any>(({ cleanup }) => {
    const controller = new AbortController();
    cleanup(() => controller.abort());

    return countriesGraphQLAPI(
      {
        query: `
        {
            continents {
              code
              name
            }
          }
        `,
      },
      controller
    );
  });

  const countriesByContinentListResource = useResource$<any>(({ track, cleanup }) => {
    track(() => selectContinent.value)
    const controller = new AbortController();
    cleanup(() => controller.abort());

    return countriesGraphQLAPI(
      {
        query: `
        query getCountriesByContinent($filter: CountryFilterInput){
            countries(filter: $filter) {
              name
              capital
              currency
              phone
              continent {
                name
              }
            }
        }
        `,
        variables: `
        {
            "filter": {
              "continent": {
                "eq": "${selectContinent.value}"
              }
            }
        }
        `
      },
      controller
    );
  });

  return (
    <>
      <h1>Countries</h1>
      <p>
        Seleccione el continente:{' '}
        {selectContinent.value === ''
          ? 'Seleccione uno por favor'
          : selectContinent.value}
      </p>
      <hr />
      <Resource
        value={continentsListResource}
        onPending={() => <div>Loading...</div>}
        onRejected={() => <div>Failed to load continents list data</div>}
        onResolved={({ continents }) => {
          return continents.length ? (
            <div>
              {continents.map((continent: any) => (
                <button
                  onClick$={() => (selectContinent.value = continent.code)}
                >
                  {continent.name}
                </button>
              ))}
            </div>
          ) : (
            <p>Sin resultados</p>
          );
        }}
      />
      <hr/>
      <Resource
        value={countriesByContinentListResource}
        onPending={() => <div>Loading...</div>}
        onRejected={() => <div>Failed to load countries list data</div>}
        onResolved={({countries}) => {
          return (countries.length ?
            <ul>
              {countries.map((country: any) => (
                <li>
                  {country.name}
                </li>
              ))}
            </ul> : <p>Sin resultados</p>
          );
        }}
      />
    </>
  );
});
