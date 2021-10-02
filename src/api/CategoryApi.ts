import { supabase } from "../supabaseClient"
import type { ExpenseGroup, ExpenseGroupId } from './GroupApi'
import type { UserId } from '../contexts'

export type ExpenseCategoryId = string

export interface ExpenseCategory {
    id: ExpenseCategoryId,
    owner_id: UserId,
    group_id: ExpenseGroupId,
    created_at: number,
    updated_at: number,
    name: string,
    color: string | null,
    keywords: Array<string>
}

export const ExpenseCategoryApi = {

    fetch: async function(group: ExpenseGroup): Promise<Array<ExpenseCategory>> {
        let { data, error, status } = await supabase
            .from('expense_categories')
            .select('*')
            .eq('group_id', group.id)
        
        if (error && status !== 406) {
            throw error
        }

        return data as Array<ExpenseCategory>
    },

    create: async function(params: {name: string, color: string, keywords: Array<string>, ownerId: UserId, groupId: UserId}) {
        console.log("creating category", params)
        let { data, error, status } = await supabase
            .from('expense_categories')
            .insert([{
                created_at: new Date(),
                updated_at: new Date(),
                name: params.name,
                color: params.color,
                owner_id: params.ownerId,
                group_id: params.groupId,
                keywords: params.keywords
            }])
        
        if (error && status !== 406) {
            throw error
        }

        return data![0] as ExpenseCategory
    },

    update: async function() {
        // TODO: implement
    },

    delete: async function() {
        // TODO: implement
    }
}