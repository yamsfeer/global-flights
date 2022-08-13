/*
  https://openflights.org/data.html
  AirportID	Unique OpenFlights identifier for this airport.
  Name	Name of airport. May or may not contain the City name.
  City	Main city served by airport. May be spelled differently from Name.
  Country	Country or territory where airport is located. See Countries to cross-reference to ISO 3166-1 codes.
  IATA	3-letter IATA code. Null if not assigned/unknown.
  ICAO	4-letter ICAO code. Null if not assigned.
  Latitude	Decimal degrees, usually to six significant digits. Negative is South, positive is North.
  Longitude	Decimal degrees, usually to six significant digits. Negative is West, positive is East.
  Altitude	In feet.
  Timezone	Hours offset from UTC. Fractional hours are expressed as decimals, eg. India is 5.5.
  DST	Daylight savings time. One of
      E (Europe),
      A (US/Canada),
      S (South America),
      O (Australia),
      Z (New Zealand),
      N (None) or U (Unknown). See also: Help: Time
  Tz database time zone	Timezone in "tz" (Olson) format, eg. "America/Los_Angeles".
  Type	Type of the airport. Value "airport" for air terminals, "station" for train stations, "port" for ferry terminals and "unknown" if not known. In airports.csv, only type=airport is included.
  Source	Source of this data.
          "OurAirports" for data sourced from OurAirports,
          "Legacy" for old data not matched to OurAirports (mostly DAFIF),
          "User" for unverified user contributions. In airports.csv, only source=OurAirports is included.
*/

/*
  AirlineID	Unique OpenFlights identifier for this airline.
  Name	Name of the airline.
  Alias	Alias of the airline. For example, All Nippon Airways is commonly known as "ANA".
  IATA	2-letter IATA code, if available.
  ICAO	3-letter ICAO code, if available.
  Callsign	Airline callsign.
  Country	Country or territory where airport is located. See Countries to cross-reference to ISO 3166-1 codes.
  Active	"Y" if the airline is or has until recently been operational,
          "N" if it is defunct. This field is not reliable: in particular, major airlines that stopped flying long ago,
          but have not had their IATA code reassigned (eg. Ansett/AN), will incorrectly show as "Y".
*/

/*
  Airline	2-letter (IATA) or 3-letter (ICAO) code of the airline.
  AirlineID	Unique OpenFlights identifier for airline (see Airline).
  Source airport	3-letter (IATA) or 4-letter (ICAO) code of the source airport.
  Source airport ID	Unique OpenFlights identifier for source airport (see Airport)
  Destination airport	3-letter (IATA) or 4-letter (ICAO) code of the destination airport.
  Destination airport ID	Unique OpenFlights identifier for destination airport (see Airport)
  Codeshare	"Y" if this flight is a codeshare (that is, not operated by Airline, but another carrier), empty otherwise.
  Stops	Number of stops on this flight ("0" for direct)
  Equipment	3-letter codes for plane type(s) generally used on this flight, separated by spaces
*/

import airports from 'resource/data/airports.json'
import airlines from 'resource/data/airlines.json'
import routes from 'resource/data/routes.json'

import { LatLong2Coor } from 'utils'

export default class Database {
  constructor() {
    this.fetchAll()
    this.normalize()
  }

  fetchAll() {
    // 原始数据
    this.rawAirports = airports
    this.rawAirlines = airlines
    this.rawRoutes = routes
  }

  normalize() {
    this.airports = this._normalizeAirports(this.rawAirports)
    this.airlines = this._normalizeAirlines(this.rawAirlines)
    this.routes = this._normalizeRoutes(this.rawRoutes)
  }

  // 将源数据的结构从二维数组整理成对象数组
  _normalizeAirports(rawAirports) {
    return rawAirports.map(airport => {
      return {
        airportId: airport[0].toString(),
        name: airport[1],
        city: airport[2],
        country: airport[3],
        IATA: airport[4],
        ICAO: airport[5],
        latitude: airport[6],
        longitude: airport[7],
        altitude: airport[8],
        timezone: airport[9],
        dst: airport[10],
        tz: airport[11],
        type: airport[12],
        source: airport[13],
      }
    })
  }

  _normalizeAirlines(rawAirlines) {
    return rawAirlines.map(airline => {
      return {
        airlineId: airline[0],
        name: airline[1],
        alias: airline[2],
        IATA: airline[3],
        ICAO: airline[4],
        callsign: airline[5],
        country: airline[6],
        active: airline[7],
      }
    })
  }

  _normalizeRoutes(rawRoutes) {
    return rawRoutes.map(route => {
      return {
        airlineCode: route[0],
        airlineId: route[1],
        sourceCode: route[2],
        source: route[3], // Source airport ID
        destinationCode: route[4],
        destination: route[5], // Destination airport ID
        codeshare: route[6],
        stops: route[7],
        equipment: route[8],
      }
    })
  }

  /**
   * 根据某属性分类，比如根据机场所在城市划分
   * @param {airport | airline | route} target
   * @param {String} prop
   * @return {Map} prop => Array
   */
  classifyAirport(prop) {
    const map = new Map()

    this.airports.forEach(airport => {
      let p = airport[prop].toLowerCase()
      if (map.has(p)) {
        map.get(p).push(airport)
      } else {
        map.set(p, [airport])
      }
    })

    return map
  }

  find(prop, value) {
    return this.airports.filter(airport => {
      return airport[prop].toLowerCase().includes(value.toLowerCase())
    })
  }
}
