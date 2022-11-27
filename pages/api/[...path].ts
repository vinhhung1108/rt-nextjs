// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import httpProxy from 'http-proxy'
import { resolve } from 'path'

const proxy = httpProxy.createProxyServer()



export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  return new Promise((resolve)=>{
      //clear cookie
    req.headers.cookie = ''
    proxy.on('proxyReq', function(proxyReq, req, res, options) {
      const rewritedPath = req.url.replace('/api',''); // can make any rule  
      proxyReq.path = rewritedPath;   
    });
    proxy.web(req, res, {
      target: 'http://localhost:4000',
      changeOrigin: true,
      selfHandleResponse: false,
    })

    proxy.once('proxyRes',()=>{
      resolve(true)
    })
  })
  

}
