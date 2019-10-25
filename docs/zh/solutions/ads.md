# APP广告

## AdSense Management API

文档地址：[https://developers.google.com/adsense/management/getting_started](https://developers.google.com/adsense/management/getting_started)

Google已经不再支持使用超级token访问API了，所以只能通过OAuth流程获取Access Token来访问API。

PHP示例代码：[https://github.com/googleapis/google-api-php-client](https://github.com/googleapis/google-api-php-client)

```php
$client = new \Google_Client();
$client->setAuthConfigFile('/path/to/client_credentials.json');
$client->addScope(\Google_Service_AdSense::ADSENSE);

// 1. 跳转auth url
redirect($client->createAuthUrl()); 

// 2. 得到code之后可以获取access_token, refresh_token存到redis中。只有第一次授权应用才有refresh_token，否则需要到谷歌账号后台先解除授权。
$token = $client->authenticate($code);

// 3. access_token过期时可以根据refresh_token获取新的。
$token = $client->refreshToken($refresh_token);

$service = new \Google_Service_AdSense($client);

// 获取广告收入信息 https://developers.google.com/adsense/management/v1.4/reference/reports/generate/
// 取不到数据的话，需要等广告投放之后第二天才有。
$service->reports->generate($date, $date, [
            'dimension' => 'DATE',
            'metric' => 'INDIVIDUAL_AD_IMPRESSIONS_RPM',
            'useTimezoneReporting' => false, // 使用美国时间。GMT - 8 time zone.
            'filter' => ...,
        ]);
```

## Facebook Audience Network

广告后台：[https://www.facebook.com/audiencenetwork](https://www.facebook.com/audiencenetwork)

1. 获取System User Token，这是一个长期有效的access_token，文档：[https://developers.facebook.com/docs/audience-network/guides/reporting/system-user](https://developers.facebook.com/docs/audience-network/guides/reporting/system-user)

2. 有了access_token之后API请求参考[https://developers.facebook.com/docs/audience-network/guides/reporting#sample-request](https://developers.facebook.com/docs/audience-network/guides/reporting#sample-request)

