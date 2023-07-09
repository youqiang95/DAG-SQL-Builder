import {HttpRequestSender} from '@/api/httpReqSender'
import {delayResult} from '@/common'
import * as MessageErrorHandlerModule from '@/api/MessageErrorHandler'

describe('HttpRequestSender', ()=>{
    describe('get', ()=>{
        it('common', async ()=>{
            const mockedResponse = { data: 'mocked data' };
            const mockStr = JSON.stringify(mockedResponse)
            jest.spyOn(global, 'fetch').mockResolvedValue({
                text: async ()=>delayResult(mockStr, 100)
              });
            const ins = new HttpRequestSender()
            const url = '/api/mockurl'
            const options = {}
            const resp = await ins.get(url, options)
            expect(resp.data).toEqual('mocked data')

            const respPost = await ins.post(url, options)
            expect(respPost.data).toEqual('mocked data')
        })

        it('timeout', async ()=>{
            const mockedResponse = { data: 'mocked data' };
            const mockStr = JSON.stringify(mockedResponse)
            jest.spyOn(global, 'fetch').mockResolvedValue({
                text: async ()=>delayResult(mockStr, 100)
              });
            
            const ins = new HttpRequestSender()
            const url = '/api/mockurl'
            const options = {timeout: 50}
            const resp = await ins.get(url, options)
            expect(resp.err).toEqual('timeout')

            const respPost = await ins.post(url, options)
            expect(respPost.err).toEqual('timeout')
        })

        it('emit error when no success resp', async ()=>{
            jest.spyOn(global, 'fetch').mockResolvedValue({
                text: async ()=>{throw new Error('')}
            });
            const spy = jest.spyOn(MessageErrorHandlerModule, 'getRequestNoSuccessManager');
            const ins = new HttpRequestSender()
            const url = '/api/mockurl'
            const options = {}
            const resp = await ins.get(url, options)
            console.log('resp', resp)
            expect(spy).toHaveBeenCalledWith()
        })
    })
})