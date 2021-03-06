/*global $, Quill*/
$(function () {
    var slug_generated = !$("form[data-id]").attr("data-id");
    $('#id_slug').on("keydown keyup keypress", function () {
        slug_generated = false;
    });
    $('input[id^=id_title_]').on("keydown keyup keypress change", function () {
        if (slug_generated) {
            var title = $('input[id^=id_title_]').filter(function () {
                return !!this.value;
            }).first().val();  // First non-empty language
            var slug = title.toLowerCase()
                .replace(/\s+/g, '-')
                .replace(/[^\w\-]+/g, '')
                .replace(/\-\-+/g, '-')
                .replace(/^-+/, '')
                .replace(/-+$/, '')
                .substr(0, 150);
            $('#id_slug').val(slug);
        }
    });

    $('#content ul.nav-tabs a').click(function (e) {
        e.preventDefault()
        $(this).tab('show');
    });


    var quills = {};
    $('.editor').each(function () {
        $(this).html($("textarea[name^=text_][lang=" + $(this).attr("data-lng") + "]").val());
        quills[$(this).attr("data-lng")] = new Quill($(this).get(0), {
            theme: 'snow',
            formats: [
                'bold', 'italic', 'link', 'strike', 'code', 'underline', 'script',
                'list', 'align', 'code-block', 'header'
            ],
            modules: {
                toolbar: [
                    [{'header': [3, 4, 5, false]}],
                    ['bold', 'italic', 'underline', 'strike'],
                    ['link'],
                    [{'align': []}],
                    [{'list': 'ordered'}, {'list': 'bullet'}],
                    [{'script': 'sub'}, {'script': 'super'}],
                    ['clean']
                ]
            }
        });
    });

    $('form:first').submit(function () {
        $('.editor').each(function () {
            var val = $(this).find('.ql-editor').html();
            $("textarea[name^=text_][lang=" + $(this).attr("data-lng") + "]").val(val);
        });
    });
});
