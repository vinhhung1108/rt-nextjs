// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import httpProxy, { ProxyResCallback } from 'http-proxy'
import { resolve } from 'path'

const proxy = httpProxy.createProxyServer()

proxy.on('proxyReq', function(proxyReq, req, res, options) {
    // const rewritedPath = req.url.replace('/api','/auth'); // can make any rule  
    // proxyReq.path = rewritedPath;
    proxyReq.path = proxyReq.path.replace('/api','auth'); // rewrite to match with api server   
  });
  
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
    if(req.method !== 'POST'){
        return res.status(404).json({message: 'Method not support'})
    }

  return new Promise((resolve)=>{
    
      //clear cookie
    req.headers.cookie = ''
    
    const handleLoginResponse: ProxyResCallback = (proxyRes,req, res) => {
        
        let body = ''
        proxyRes.on('data', function (chunk) {
            body += chunk
        })

        proxyRes.on('end', function () {
            const { access_token } = JSON.parse(body)
            console.log({ access_token });
            res.end("my response to cli")
        })
    }
    
    // proxy.once('proxyRes', handleLoginResponse)
    proxy.once('proxyRes',()=>{
        console.log('here')
        resolve(true)
      })

    proxy.web(req, res, {
      target: 'http://localhost:4000',
      changeOrigin: true,
      selfHandleResponse: true,
    })
  })

}
