# 2. Hosting and Delivery of Serverless Web Applications on AWS

## 2.1. Hosting Web Applications with Amazon S3

First core concept, hosting.

Steps:
- Learning
- Implementing

Understanding Hosting Needs

Serverless Web Delivery
- Amazon S3
- Amazon CloudFront

Serverless Hosting Needs
- Ability to server static assets for the web applications
- Configurations for applications routing
- Configuration for hosting performance and optimization
- Minimal latency irrespective of location

Uploading a React App to Amazon S3

Create a React project with '**npx create-react-app sample-react-app**' and install '**npm i react-router-dom**'.

Add a simple router to App.js.

```js
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom"

function App() {
  return (
      <div className="App">
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/page1">Page 1</Link></li>
          <li><Link to="/page2">Page 2</Link></li>
        </ul>
        <Routes>
          <Route path="/page1">
          </Route>
          <Route path="/page2">
          </Route>
          <Route path="/">
          </Route>
        </Routes>
      </div>
    </Router>
  );
}
export default App;

```

Go to AWS console' go to S3 and create a bucket and upload all build folder, can use drag and drop interface to upload files and folders.

Hosting a React App to Amazon S3

We uploaded files to bucket. We need to configure bucket. 

1. Go to bucket properties.
2. Enable static website hosting.
3. Set index document an index.html.
4. We can see a new URL at the bottom of bucket. We can't access this URL.
5. Go to permissions of bucket disable block all public access. Still we can't access, we need to give access.
6. Go to objects of bucket, go to index.html permissions, enable ACL, enable Read for Everyone(public access).
7. When we check the bucket URL we can see the page but, we can't access JS resources.
8. Go to bucket permissions, add bucket policy below JSON.

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid":"EnablePublicAccess",
      "Effect":"Allow",
      "Principal": "*",
      "Action":["s3:GetObject"],
      "Resource":["arn:aws:s3:::ps-serverless-test-hosting-hce/*"]
    }
  ]
}
```
After these steps we should see bucket as "Publicly accessible" and Permission overview - Access as Public.

Also, we can set index.html as our Error document.

**Amazon S3 Hosting Performance**
- Evaluating hosting performance
- Enabling cache headers for static assets in Amazon S3
- Reviewing compression capabilities

We can use https://pagespeed.web.dev/ to analyze site performance. We can get optimization points from this site like enabling text compression or caching options.

Likewise, we can go to static folder and select JS files. Edit metadata of these files. Add metadata with Type "System defined", Key "Cache-Control", value "max-age=31536000,public".

Configuring Cache Headers Using the AWS CLI

Configuring Cache Control for JS/CSS Files (1 Year)
```
aws s3 cp /
  s3://ps-serverless-test-hosting-hce/ s3://ps-serverless-test-hosting-hce/ \
  -- exclude '*' \
  --include '*.css' --include '*.js' \
  --cache-control 'max-age=31104000, public' \
  --recursive \
  --metadata-directive REPLACE --acl public-read
```

Configuring Cache Control for Images (1 Year)
```
aws s3 cp /
  s3://ps-serverless-test-hosting-hce/ s3://ps-serverless-test-hosting-hce/ \
  -- exclude '*' \
  --include '*.jpg' --include '*.png' --include '*.gif' \
  --cache-control 'max-age=31104000, public' \
  --recursive \
  --metadata-directive REPLACE --acl public-read
```

We didn't solve text compression for now, we are going to solve it with Amazon CloudFront.

## 2.2. Utilizing Amazon CloudFront

Amazon CloudFront Overview

S3 Hosting Areas of Improvement
- Global latency
- Content compression(without additional work)
- Origin caching

**Amazon CloudFront** is a fast content delivery network (CDN) service that securely delivers data, videos, applications, and APIs to customers globally with low latency, (and) high transfer speeds.

When we serve the content directly from S3 bucket long distance user's request travels the public internet, if we serve with CloudFront user request goes to the closest edge location and edge locations makes a request from the Amazon network to specific bucket. Edge locations cache the S3 resources.

**CloudFront Terms**
- Distribution
- Origin
- Behavior
- Cache Hit and Cache Miss
- Invalidation

**Creating a CloudFront Distribution**
- Creating a new S3 bucket to use with CloudFront
- Launching and configuring a new CloudFront distribution

Steps:
1. Go to AWS console S3
2. Create a new bucket, like 'ps-serverless-test-cloudfront-hosting-hce' on us-east-1
3. Upload project files again.
4. Go to AWS console CloudFront.
5. Create distribution.
  - Use bucket selection for 'Origin domain'.
  - Enable 'Restrict Bucket Access', probably in recent configs it maps to 'Yes use OAI'. We are not making S3 files publicly accessible.
  - Create Origin access identity, create a specific identity with bucket.
  - Check 'Yes, Update Bucket Policy'.
  - Check viewer protocol policy as 'redirect HTTP to HTTPS'.
  - Enable 'Compress Objects Automatically'.
  - Set 'Default Root Object' as index.html
6. Wait for distribution to complete.

**Configuring and Invalidating CloudFront**

Demo:
- Verify the CloudFront distribution
- Inspect the S3 bucket policy
- Configuring routes to work with CloudFront
- Invalidating a CloudFront distribution

When we check the deployed distribution we can see the React app page on 'Distribution domain name' with HTTPS of course.

We can add error page from CloudFront distribution 'Error Pages', create a custom error response for HTTP Error Code- 403: Forbidden redirect it to Response Page Path: /index.html, HTTP Response Code: 200: OK.

We can manually invalidate cached resources, we can create an Invalidation for everything with '/*' expression.
