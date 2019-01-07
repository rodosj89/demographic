/* tslint:disable */

declare var Object: any;
export interface DemographicInterface {
  "country": string;
  "population": number;
  "id"?: any;
}

export class Demographic implements DemographicInterface {
  "country": string;
  "population": number;
  "id": any;
  constructor(data?: DemographicInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Demographic`.
   */
  public static getModelName() {
    return "Demographic";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Demographic for dynamic purposes.
  **/
  public static factory(data: DemographicInterface): Demographic{
    return new Demographic(data);
  }
  /**
  * @method getModelDefinition
  * @author Julien Ledun
  * @license MIT
  * This method returns an object that represents some of the model
  * definitions.
  **/
  public static getModelDefinition() {
    return {
      name: 'Demographic',
      plural: 'Demographics',
      path: 'Demographics',
      idName: 'id',
      properties: {
        "country": {
          name: 'country',
          type: 'string'
        },
        "population": {
          name: 'population',
          type: 'number',
          default: 1
        },
        "id": {
          name: 'id',
          type: 'any'
        },
      },
      relations: {
      }
    }
  }
}
