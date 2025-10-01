<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>Tenant Dashboard</title>
    @viteReactRefresh
    @vite(['resources/css/app.css', 'resources/js/Tenants/Dashboard.jsx'])
</head>

<body>
    <div id="root"></div> <!-- React mounts here -->
</body>
</html>
