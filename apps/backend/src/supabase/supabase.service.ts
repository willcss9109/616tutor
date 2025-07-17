import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class SupabaseService {
  private supabase: SupabaseClient;

  constructor(private configService: ConfigService) {
    const supabaseUrl = this.configService.get<string>('SUPABASE_URL');
    const supabaseKey = this.configService.get<string>('SUPABASE_ANON_KEY');
    
    if (!supabaseUrl || !supabaseKey) {
      throw new Error('Supabase configuration is missing');
    }
    
    this.supabase = createClient(supabaseUrl, supabaseKey);
  }

  getClient(): SupabaseClient {
    return this.supabase;
  }

  // Helper method for admin operations
  getServiceClient(): SupabaseClient {
    const supabaseUrl = this.configService.get<string>('SUPABASE_URL');
    const serviceKey = this.configService.get<string>('SUPABASE_SERVICE_KEY');
    
    if (!supabaseUrl || !serviceKey) {
      throw new Error('Service key not configured');
    }

    return createClient(supabaseUrl, serviceKey);
  }
}