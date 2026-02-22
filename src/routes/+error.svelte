<script>
    import { page } from "$app/state";

    let route = page.url.pathname;
</script>

<h1>404</h1>
<h2>You can't be here</h2>
<p>The <code>{route}</code> route doesn't exist</p>
