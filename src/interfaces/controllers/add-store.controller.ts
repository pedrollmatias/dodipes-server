// import { CustomError, ErrorCodes } from '../../domain/shared/custom-error';
// import { TSchemaModel } from '../interface.types';
// import { HttpRequest } from './controller.types';
// import { DataValidator } from '../data-validator';
// import { SchemaValidator } from '../schema-validator';
// import { IAddStoreRequest } from './schemas/add-store.schema';
// import { IAddStoreFormattedRequest } from '../../application/use-cases/store/add-store.use-case';

// export class AddStoreController {
//   private readonly dataValidator: DataValidator<IAddStoreRequest>;

//   private readonly schemaValidator: SchemaValidator<IAddStoreRequest>;

//   private readonly schema: TSchemaModel<IAddStoreRequest>;

//   constructor({
//     dataValidator,
//     schemaValidator,
//     schema,
//   }: {
//     dataValidator: DataValidator<IAddStoreRequest>;
//     schemaValidator: SchemaValidator<IAddStoreRequest>;
//     schema: TSchemaModel<IAddStoreRequest>;
//   }) {
//     this.dataValidator = dataValidator;
//     this.schemaValidator = schemaValidator;
//     this.schema = schema;
//   }

//   handle({ input }: { input: HttpRequest }): IAddStoreFormattedRequest {
//     this.schemaValidator.validate(this.schema);

//     const { body, headers } = input;

//     const data = <IAddStoreRequest>(<unknown>{
//       body,
//       headers,
//     });
//     const isValidData = this.dataValidator.validate(data, this.schema);

//     if (!isValidData) {
//       const error = this.dataValidator.getError();

//       throw <CustomError>{
//         statusCode: ErrorCodes.BAD_REQUEST,
//         message: error,
//       };
//     }

//     const { media, address, name, storename, userId } = data.body;

//     const logoBuffer = media?.logo ? Buffer.from(this.extractContentFromStringBase64(media.logo), 'base64') : undefined;
//     const coverPhotoBuffer = media?.coverPhoto
//       ? Buffer.from(this.extractContentFromStringBase64(media.coverPhoto), 'base64')
//       : undefined;

//     const addStoreFormattedRequest: IAddStoreFormattedRequest = {
//       body: {
//         address,
//         name,
//         storename,
//         userId,
//         ...((logoBuffer || coverPhotoBuffer) && {
//           media: {
//             logo: logoBuffer,
//             coverPhoto: coverPhotoBuffer,
//           },
//         }),
//       },
//     };

//     return addStoreFormattedRequest;
//   }

//   private extractContentFromStringBase64(stringBase64: string): string {
//     const [, relevantPart] = stringBase64.split(',');

//     return relevantPart;
//   }
// }
