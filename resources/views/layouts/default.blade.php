<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>{{ $meta_title }}</title>
</head>
<body>
    <script>
        var RS = '{{ RS }}';    
    </script>

    @include('elements.header')
    
    @yield('content')
    <script src="https://code.jquery.com/jquery-2.2.4.min.js"></script>
    <script src="{{ RS.'public/js/app.js' }}"></script>
</body>
</html>