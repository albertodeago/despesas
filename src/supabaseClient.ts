import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY

if (!supabaseUrl || ! supabaseAnonKey) {
    throw Error("Supabase url and anon-key are mandatory")
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export const getUser = function() {
    const user = supabase.auth.user()
    if (!user) {
        throw new Error('User returned by supabase is empty')
    }
    return user
}