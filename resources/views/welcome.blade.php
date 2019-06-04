<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>Laravel</title>

    <!-- Fonts -->
    <link href="https://fonts.googleapis.com/css?family=Nunito:200,600" rel="stylesheet">

    <!-- Styles -->
    <link rel="stylesheet" href="{{ url('') }}/css/app.css">
</head>
<body>
    <div id="app">
        <public-layout v-if="layout == 'public'"></public-layout>
        <app-layout v-if="layout == 'app'"></app-layout>
    </div>
    <script src="{{ url('') }}/js/app.js"></script>
</body>
</html>
