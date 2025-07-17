import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {createClient, SupabaseClient, User} from '@supabase/supabase-js';

@Injectable()
export class SupabaseService {
  private readonly supabasePublicClient: SupabaseClient;
  private readonly supabaseServiceClient: SupabaseClient;

  constructor(private configService: ConfigService) {
    const supabaseUrl = this.configService.get<string>('SUPABASE_URL');
    const anonKey = this.configService.get<string>('SUPABASE_ANON_KEY');
    const serviceKey = this.configService.get<string>('SUPABASE_SERVICE_KEY');

    if (!supabaseUrl || !anonKey || !serviceKey) {
      throw new Error('Supabase configuration is missing');
    }

    this.supabasePublicClient = createClient(supabaseUrl, anonKey);
    this.supabaseServiceClient = createClient(supabaseUrl, serviceKey);
  }

  public getPublicClient(): SupabaseClient {
    return this.supabasePublicClient;
  }

  public getServiceClient(): SupabaseClient {
    return this.supabaseServiceClient;
  }

  public async findUserById(id: string) : Promise<User | null> {
    const res = await this.getServiceClient().auth.admin.getUserById(id);
    return res.data.user;
  }

  public async isUserExists(id: string): Promise<boolean> {
    return !!(await this.findUserById(id));
  }

}