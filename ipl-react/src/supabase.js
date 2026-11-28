
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ynxxyqcvvtgdtgjgkgow.supabase.co';

const supabaseKey = 'sb_publishable_MLUoUMRSlurX8Owbg81MHg_R0kzNg-l';

export const supabase = createClient(
  supabaseUrl,
  supabaseKey
);
