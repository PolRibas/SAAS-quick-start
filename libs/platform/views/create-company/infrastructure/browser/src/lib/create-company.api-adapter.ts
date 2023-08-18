import { CompanyEntityDto, CreateCompanyApi } from '@saas-quick-start/infrastructure/open-api';
import axios from 'axios';

export class CreateCompanyApiBrowserAdapter {
  private createCompanyApi: CreateCompanyApi

  constructor(
    private baseURL: string,
    private accessToken: string,
  ) {
    ;
    this.baseURL = baseURL
    this.createCompanyApi = new CreateCompanyApi(
      undefined,
      baseURL,
      axios.create({
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }),
    )
  }

  async createCompany({
    name,
    address,
    phoneNumber,
    email,
  }): Promise<{
    company: CompanyEntityDto;
    role: string;
    permissions: string[];
  }> {
    const response = await this.createCompanyApi.frontOfficeCreateCompanyControllerCreate({
      name,
      address,
      phoneNumber,
      email,
    })
    const { company, role, permissions } = response.data;

    return {
      company,
      role,
      permissions,
    };
  }
}
