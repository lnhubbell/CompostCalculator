from django import forms
from calculator.models import CompostItem

class CompostItemCreateForm(forms.ModelForm):
    class Meta:
        model = CompostItem
        fields = ("title", "description", "carbon", "nitrogen")


class CompostItemUpdateForm(CompostItemCreateForm):
    def __init__(self,*args,**kwargs):
        super(CompostItemUpdateForm, self).__init__(*args,**kwargs)
        self.fields['title'].required = True
        self.fields['nitrogen'].required = True
        self.fields['carbon'].required = True
