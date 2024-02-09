import { IRes } from 'common/axios/useCrud'
import { deleteItemsById } from 'libs/utils/array'

export type TAnalyze = {
    id: number
    chainid: number
    startblocknumber: number
    endblocknumber?: number
    startblocktime: number
    endblocktime: number
    analynftcount?: number
    trydatetime?: number
    enddatetime: number
    originalassetname: string
    originalassetpath: string
    originalassethash: number | string | null
    step: number
    memberid?: number
}

export type TAnalyzeInfo = {
    id: number
    chainid: number
    blocknumber: number
    blocktimestamp: number
    contractaddress: string
    tokenid: string
    tokentype: string | null
    owneraddress: string | null
    tokenurl: string
    tokenurlGateway: string | null
    title: string
    asseturl: string
    asseturlGateway: string | null
    assettype: number
    thumbnail: string
    extrametadata: string | null
}

export type TAnalyzeResults = {
    id: number
    similarityrate: number
    resultdatetime: string
    nftInfo: TAnalyzeInfo
}

export type TAnalyzeResult = Pick<
    TAnalyze,
    'trydatetime' | 'enddatetime' | 'originalassetname' | 'originalassetpath'
> & {
    id: number
    analynftcount: number
    analyseResults: TAnalyzeResults[]
}

export type TAnalyzeRes = TPaginatedState<TAnalyze[]>

export type TAnalyzeState = {
    analyzeList: TAnalyzeRes
    analyzeDetail: TAnalyze | null
    analyzeResult: TAnalyzeResult | null
}

export type TAnalyzeAction =
    | {
          type: 'SET'
          payload: TAnalyzeRes
      }
    | {
          type: 'ADD'
          payload: TAnalyze
      }
    | {
          type: 'EDIT'
          payload: TAnalyze
      }
    | {
          type: 'DELETE'
          payload: number
      }
    | {
          type: 'GET'
          payload: IRes<TAnalyze[]>
      }
    | {
          type: 'GET_ANALYZE_RESULT'
          payload: IRes<TAnalyzeResult>
      }
    | {
          type: 'GET_BY_ID'
          payload: number
      }
    | {
          type: 'DELETE_MULTIPLE_ANALYZE_LIST'
          payload: number[]
      }

export function analyzeReducer(state: TAnalyzeState, action: TAnalyzeAction): TAnalyzeState {
    const { analyzeList } = state
    const { type } = action
    switch (type) {
        case 'SET':
            console.info('dispatched:: ANALISYS_SET')
            return {
                ...state,
                analyzeList: {
                    result: action.payload.result,
                    pagination: action.payload.pagination,
                },
            }
        case 'ADD':
            console.info('dispatched:: ANALYZE_ADD')
            return {
                ...state,
                analyzeList: {
                    result: [...state.analyzeList.result, action.payload],
                },
            }
        case 'EDIT':
            console.info('dispatched:: ANALYZE_EDIT')
            const analyzeToUpdate = analyzeList.result.find((analyze) => analyze.id === action.payload.id)
            if (!analyzeToUpdate) return state

            const updatedAnalisys: TAnalyze[] = analyzeList.result.map((analyze) =>
                analyze.id === analyzeToUpdate.id ? action.payload : analyze
            )

            return {
                ...state,
                analyzeList: {
                    result: updatedAnalisys,
                },
            }
        case 'DELETE':
            console.info('dispatched:: ANALYZE_DELETE')
            const filteredAnalysis: TAnalyze[] = analyzeList.result.filter((analyze) => analyze.id !== action.payload)
            return {
                ...state,
                analyzeList: {
                    result: filteredAnalysis,
                },
            }
        case 'GET':
            console.info('dispatched:: ANALISYS_GET')
            return {
                ...state,
                analyzeList: {
                    result: action.payload.result!,
                },
            }

        case 'GET_BY_ID':
            console.info('dispatched:: ANALYZE_GET_BY_ID')
            const analyzeById = analyzeList.result.find((analyze) => analyze.id === action.payload)
            return {
                ...state,
                analyzeDetail: analyzeById || null,
            }
        case 'GET_ANALYZE_RESULT':
            console.info('dispatched:: GET_ANALYZE_RESULT')
            return {
                ...state,
                analyzeResult: action.payload.result!,
            }
        case 'DELETE_MULTIPLE_ANALYZE_LIST':
            console.info('dispatched:: DELETE_MULTIPLE_ANALYZE_LIST')
            const newArrayAfterMultipleDelete = deleteItemsById(state.analyzeList.result, action.payload)
            return {
                ...state,
                analyzeList: {
                    result: newArrayAfterMultipleDelete,
                },
            }
        default:
            return state
    }
}
