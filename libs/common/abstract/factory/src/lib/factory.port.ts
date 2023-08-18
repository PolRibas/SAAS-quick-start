export interface IAbstractMongooseFactory<DomainInterface, DocumentInterface> {
  domainToMongoose(domain: DomainInterface): DocumentInterface;
  mongooseToDomain(mongoose: DocumentInterface): DomainInterface;
}
