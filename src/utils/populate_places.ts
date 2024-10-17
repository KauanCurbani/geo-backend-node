import "reflect-metadata";
import fetch from "node-fetch";
import { AppDataSource } from "../infra/database/data-source";
import { Place } from "../domain/entities/place/place";

async function main() {
  const apiKey = "4ae8be3810174f6586d8aa59441de3c4";
  const baseUrl = "https://api.geoapify.com/v2/places";
  const places = [
    "geometry:2e0c71617e7050ac13b96ad513b9ce29&bias=proximity:-49.26538157027342,-26.1923663"


  ];

  places.forEach(async (place) => {
    const response = await fetch(
      `${baseUrl}?categories=commercial,entertainment&filter=${place}&limit=500&apiKey=${apiKey}`
    ).then((res) => res.json());

    const places = response.features
      .map((place) => {
        const {
          name,
          country,
          state,
          state_code,
          city,
          postcode,
          suburb,
          street,
          housenumber,
          lon,
          lat,
          formatted,
          opening_hours,
        } = place.properties;
        const newPlace = new Place();
        newPlace.name = name;
        newPlace.country = country;
        newPlace.state = state;
        newPlace.stateCode = state_code;
        newPlace.city = city;
        newPlace.postalCode = postcode;
        newPlace.suburb = suburb;
        newPlace.street = street;
        newPlace.houseNumber = housenumber;
        newPlace.lng = lon;
        newPlace.lat = lat;
        newPlace.formattedAddress = formatted;
        newPlace.openHours = opening_hours;

        return newPlace;
      })
      .filter((place) => place.name);

    AppDataSource.getRepository(Place).save(places);
  });
}

AppDataSource.initialize()
  .then(main)
  .catch((error) => console.log(error));
