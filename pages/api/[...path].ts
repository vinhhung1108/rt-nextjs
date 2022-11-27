// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import httpProxy from 'http-proxy'
import type { NextApiRequest, NextApiResponse } from 'next'

const proxy = httpProxy.createProxyServer()

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  return new Promise((resolve)=>{
      //clear cookie
    req.headers.cookie = '';

    proxy.on('proxyReq', function(proxyReq, req, res, options) {  
      proxyReq.path = proxyReq.path.replace('/api',''); //rewrite to match with api server
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
