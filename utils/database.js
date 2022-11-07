import * as SQLite from "expo-sqlite";
import { Place } from "../models/place";

const database = SQLite.openDatabase("places.db");

export const init = () => {
  const promise = new Promise((resolve, reject) => {
    database.transaction((tr) => {
      tr.executeSql(
        `CREATE TABLE IF NOT EXISTS places (
                    id INTEGER PRIMARY KEY NOT NULL,
                    title TEXT NOT NULL,
                    imageUri TEXT NOT NULL,
                    address TEXT NOT NULL,
                    lat REAL NOT NULL,
                    lng REAL NOT NULL
                )`,
        [],
        () => {
          resolve();
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });

  return promise;
};

export const insertPlace = (place) => {
  const promise = new Promise((resolve, reject) => {
    database.transaction((tr) => {
      tr.executeSql(
        `INSERT INTO places (title,imageUri,address,lat,lng) VALUES (?,?,?,?,?)`,
        [
          place.title,
          place.imageUri,
          place.address,
          place.location.lat,
          place.location.lng,
        ],
        (_, res) => {
          resolve(res);
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });

  return promise;
};

export const getPlaces = () => {
  const promise = new Promise((resolve, reject) => {
    database.transaction((tr) => {
      tr.executeSql(
        `SELECT * FROM places`,
        [],
        (_, res) => {
          const places = [];
          for (const data of res.rows._array) {
            places.push(
              new Place(
                data.title,
                data.imageUri,
                data.address,
                {
                  lat: data.lat,
                  lng: data.lng,
                },
                data.id
              )
            );
          }
          resolve(places);
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });

  return promise;
};

export const getSinglePlace = (id) => {
  const promise = new Promise((resolve, reject) => {
    database.transaction((tr) => {
      tr.executeSql(
        `SELECT * FROM places WHERE id = ?`,
        [id],
        (_, res) => {
          resolve(res.rows._array[0]);
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });

  return promise;
};
